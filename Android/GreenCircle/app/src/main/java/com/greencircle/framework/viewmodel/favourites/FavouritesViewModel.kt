package com.greencircle.framework.viewmodel.favourites

import android.content.Context
import android.util.Log
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.greencircle.domain.model.company.CompanySummary
import com.greencircle.domain.model.favourites.FavouriteResponse
import com.greencircle.domain.model.profile.Profile
import com.greencircle.domain.usecase.auth.RecoverTokensRequirement
import com.greencircle.domain.usecase.catalogue.CatalogueRequirement
import com.greencircle.domain.usecase.favourites.FavouritesByUserRequirement
import com.greencircle.domain.usecase.profile.ProfileListRequirement
import java.util.UUID
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class FavouritesViewModel(private val context: Context) : ViewModel() {
    val favouritesLiveData = MutableLiveData<List<CompanySummary>>()
    val userLiveData = MutableLiveData<Profile>()
    private val favouritesByUserListRequirement = FavouritesByUserRequirement()
    private val catalogueListRequirement = CatalogueRequirement()
    private val recoverTokens = RecoverTokensRequirement(context)
    private lateinit var userId: UUID

    fun setUserId(userId: UUID) {
        this.userId = userId
    }

    fun getFavouritesByUser() {
        viewModelScope.launch(Dispatchers.IO) {
            val tokens = recoverTokens() ?: return@launch
            val authToken = tokens.authToken
            val id: UUID = UUID.fromString("8de45630-2e76-4d97-98c2-9ec0d1f3a5b9")
            val result: FavouriteResponse ? = favouritesByUserListRequirement(authToken, id)
            val user: Profile? = ProfileListRequirement()(authToken, userId)
            if (user != null) {
                CoroutineScope(Dispatchers.Main).launch {
                    userLiveData.postValue(user!!)
                }
            }
            if (result == null) {
                Log.d("SalidaGetFavouritesByUser", "result is null")
            } else {
                // Obtain the list of favorite companies
                val companies: List<CompanySummary>? = fetchFavouriteCompanies(result)
                if (companies != null) {
                    CoroutineScope(Dispatchers.Main).launch {
                        favouritesLiveData.postValue(companies!!)
                    }
                } else {
                    Log.d("SalidaGetFavouritesByUser", "companies list is null")
                }
            }
        }
    }

    private suspend fun fetchFavouriteCompanies
    (favourites: FavouriteResponse): List<CompanySummary>? {
        val companies = mutableListOf<CompanySummary>()
        val favouritesList = favourites.rows

        favouritesList.forEach { favourite ->
            val company = fetchCompanyData(favourite.companyId.toString())
            company?.let {
                companies.add(it)
            }
        }

        return companies
    }

    private suspend fun fetchCompanyData(companyId: String): CompanySummary? {
        val tokens = recoverTokens() ?: return null
        val authToken = tokens.authToken

        return try {
            // Use the function from CatalogueViewModel to fetch CompanySummary by id
            catalogueListRequirement.getCompanyData(authToken, companyId)
        } catch (e: Exception) {
            Log.e("FavouritesViewModel", "Error fetching company data: ${e.message}")
            null
        }
    }
}

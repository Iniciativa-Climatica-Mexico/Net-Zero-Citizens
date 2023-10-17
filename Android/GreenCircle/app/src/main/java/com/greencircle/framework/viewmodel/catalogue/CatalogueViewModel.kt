package com.greencircle.framework.viewmodel.catalogue

import android.content.Context
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.greencircle.domain.model.company.CompanyParams
import com.greencircle.domain.model.company.CompanySummary
import com.greencircle.domain.model.favourites.FavouriteRequest
import com.greencircle.domain.usecase.auth.RecoverTokensRequirement
import com.greencircle.domain.usecase.auth.RecoverUserSessionRequirement
import com.greencircle.domain.usecase.catalogue.CatalogueRequirement
import com.greencircle.domain.usecase.favourites.FavouritesByUserRequirement
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

/**
 * Esta clase se utiliza para almacenar los datos de resumen de
 * la empresa y crear la vista de la tarjeta del catálogo de la empresa
 */

class CatalogueViewModel(context: Context) : ViewModel() {
    val catalogueLiveData = MutableLiveData<ArrayList<CompanySummary>?>()
    private val catalogueRequirement = CatalogueRequirement()
    private val recoverTokens = RecoverTokensRequirement(context)
    private val recoverSession = RecoverUserSessionRequirement(context)

    val params = MutableLiveData(
        CompanyParams(
            "",
            "",
            "",
            "",
            0.0,
            0.0,
        )
    )

    fun updateParams(params: CompanyParams) {
        this.params.value = params
    }

    fun clearParams() {
        this.params.value = this.params.value?.name?.let {
            CompanyParams(
                "",
                it,
                "",
                "",
                0.0,
                0.0,
            )
        }
    }

    /**
     * Esta función se utiliza para obtener la lista de resumen de la empresa
     */
    fun fetchAllCompanies(params: CompanyParams) {
        viewModelScope.launch(Dispatchers.IO) {
            val tokens = recoverTokens()
            val session = recoverSession()
            if (tokens == null || session == null) {
                CoroutineScope(Dispatchers.Main).launch {
                    catalogueLiveData.postValue(null)
                }
                return@launch
            }

            val authToken = tokens.authToken

            val data = catalogueRequirement.getCatalogue(authToken, session.uuid, params)
            CoroutineScope(Dispatchers.Main).launch {
                catalogueLiveData.postValue(data)
            }
        }
    }

    /**
     * Permite mandar las empresas seleccionadas como favoritas a la base de datos
     */
    fun markAsFavourite(params: FavouriteRequest) {
        viewModelScope.launch(Dispatchers.IO) {
            val tokens = recoverTokens()
            if (tokens == null) {
                CoroutineScope(Dispatchers.Main).launch {
                    catalogueLiveData.postValue(null)
                }

                return@launch
            }

            val authToken = tokens.authToken
            val favoritesRequirement = FavouritesByUserRequirement()

            favoritesRequirement.markAsFavourite(authToken, params)
        }
    }
}
package com.greencircle.framework.viewmodel.favourites

import android.content.Context
import android.util.Log
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.greencircle.domain.model.favourites.Favourites
import com.greencircle.domain.model.profile.Profile
import com.greencircle.domain.usecase.auth.RecoverTokensRequirement
import com.greencircle.domain.usecase.favourites.FavouritesByUserRequirement
import com.greencircle.domain.usecase.profile.ProfileListRequirement
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import java.util.UUID

class FavouritesViewModel(private val context: Context) : ViewModel() {
    val favouritesLiveData = MutableLiveData<Favourites>()
    val userLiveData = MutableLiveData<Profile>()
    private val favouritesByUserListRequirement = FavouritesByUserRequirement()
    private val recoverTokens = RecoverTokensRequirement(context)
    private lateinit var userId: UUID

    fun setUserId(userId: UUID) {
        this.userId = userId
    }

    fun getFavouritesByUser() {
        viewModelScope.launch(Dispatchers.IO) {
            val tokens = recoverTokens() ?: return@launch
            val authToken = tokens.authToken
            val result: Favourites? = favouritesByUserListRequirement(authToken, userId)

            if (result == null) {
                Log.d("SalidaGetFavouritesByUser", "result is null")
            } else {
                // Obtener el perfil del usuario
                val user: Profile? = ProfileListRequirement()(authToken, userId)

                if (user != null) {
                    CoroutineScope(Dispatchers.Main).launch {
                        // Actualizar MutableLiveData con el perfil del usuario
                        userLiveData.postValue(user!!)
                        favouritesLiveData.postValue(result!!)
                    }
                } else {
                    Log.d("SalidaGetFavouritesByUser", "user is null")
                }
            }
        }
    }
}

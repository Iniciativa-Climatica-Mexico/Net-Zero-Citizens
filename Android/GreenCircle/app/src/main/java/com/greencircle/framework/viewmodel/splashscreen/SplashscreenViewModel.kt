package com.greencircle.framework.viewmodel.splashscreen

import android.content.Context
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.greencircle.domain.model.auth.AuthResponse
import com.greencircle.domain.usecase.auth.DeleteTokensRequirement
import com.greencircle.domain.usecase.auth.DeleteUserSessionRequirement
import com.greencircle.domain.usecase.auth.RecoverTokensRequirement
import com.greencircle.domain.usecase.auth.SaveTokensRequirement
import com.greencircle.domain.usecase.auth.SaveUserSessionRequirement
import com.greencircle.domain.usecase.auth.UpdateTokensRequirement
import com.greencircle.utils.Constants
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

/**
 * ViewModel para la creación de la splashscreen.
 *
 * Esta clase ViewModel se utiliza para gestionar la duración de la splashscreen que se
 * muestra al iniciar la app.
 */
class SplashscreenViewModel(private val context: Context) : ViewModel() {
    val finishedLoading = MutableLiveData<Boolean>()
    val isUserLoggedIn = MutableLiveData<Boolean>()
    val userUncompletedRegister = MutableLiveData<Boolean>()
    val recoverTokens = RecoverTokensRequirement(context)
    val updateTokens = UpdateTokensRequirement()
    val saveTokens = SaveTokensRequirement(context)
    val deleteTokens = DeleteTokensRequirement(context)
    val deleteUserSession = DeleteUserSessionRequirement(context)
    val saveUserSession = SaveUserSessionRequirement(context)
    private var _res: AuthResponse? = null

    /**
     * Gestiona la duración de nuestro splashscreen.
     *
     */
    fun onCreate() {
        finishedLoading.postValue(false)
        isUserLoggedIn.postValue(false)
        userUncompletedRegister.postValue(false)

        viewModelScope.launch {
            updateTokens()
            delay(Constants.SPLASHSCREEN_DURATION)
            finishedLoading.postValue(true)
        }
    }

    private suspend fun updateTokens() {
        val tokens = recoverTokens()

        if (tokens?.refreshToken != null)
            _res = updateTokens(tokens.refreshToken)

        if (_res != null && _res?.tokens?.authToken != null) {
            saveTokens(_res?.tokens?.authToken!!, _res?.tokens?.refreshToken!!)
            saveUserSession(_res?.user!!)
            if (_res?.user?.roles == "new_user")
                userUncompletedRegister.postValue(true)
            else
                isUserLoggedIn.postValue(true)
        } else {
            deleteTokens()
            deleteUserSession()
        }
    }
}
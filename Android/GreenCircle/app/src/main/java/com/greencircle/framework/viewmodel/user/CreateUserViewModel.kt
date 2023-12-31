package com.greencircle.framework.viewmodel.user

import android.content.Context
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.greencircle.data.remote.user.UserAPIService
import com.greencircle.domain.model.auth.AuthResponse
import com.greencircle.domain.usecase.auth.GoogleAuthRequirement
import com.greencircle.domain.usecase.auth.RecoverTokensRequirement
import com.greencircle.domain.usecase.auth.SaveTokensRequirement
import com.greencircle.domain.usecase.auth.SaveUserSessionRequirement
import com.greencircle.domain.usecase.auth.UpdateTokensDataRequirement
import com.greencircle.domain.usecase.user.UpdateUserRequirement
import java.util.UUID
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

/**
 * ViewModel para la creación de usuarios.
 *
 * Esta clase ViewModel se utiliza para gestionar las operaciones relacionadas con la creación de usuarios,
 * incluyendo el inicio de sesión con Google.
 */
class CreateUserViewModel(private val context: Context) : ViewModel() {
    private val googleAuthRequirement = GoogleAuthRequirement()
    private val updateUserRequirement = UpdateUserRequirement()
    private val saveUserSession = SaveUserSessionRequirement(context)
    private val recoverTokens = RecoverTokensRequirement(context)
    private val saveTokens = SaveTokensRequirement(context)
    private val updateTokensData = UpdateTokensDataRequirement()
    val googleLoginError = MutableLiveData<Boolean>()
    val error = MutableLiveData<Boolean>()
    private val _googleLoginResult = MutableLiveData<AuthResponse?>()
    val googleLoginResult: LiveData<AuthResponse?> = _googleLoginResult

    /**
     * Realiza el inicio de sesión con Google utilizando el token proporcionado.
     *
     * @param token El token de autenticación de Google.
     */
    fun googleLogin(token: String) {
        viewModelScope.launch(Dispatchers.IO) {
            val result: AuthResponse? = googleAuthRequirement(token)
            _googleLoginResult.postValue(result)

            if (result == null) {
                googleLoginError.postValue(true)
                return@launch
            }

            if (result != null && result.tokens == null) {
                googleLoginError.postValue(true)
                return@launch
            } else {
                googleLoginError.postValue(false)
            }

            // Guardar tokens
            val authToken = result?.tokens?.authToken
            val refreshToken = result?.tokens?.refreshToken
            saveTokens(authToken!!, refreshToken!!)

            // Guardar usuario global
            saveUserSession(result.user)
        }
    }

    /**
     * Actualiza la información de un usuario.
     *
     * @param userId El ID del usuario que se va a actualizar.
     * @param userInfo La información actualizada del usuario.
     */
    fun updateUser(userId: UUID, userInfo: UserAPIService.UpdateUserRequest) {
        val tokens = recoverTokens()
        if (tokens == null) {
            error.postValue(true)
            return
        }

        var authToken = ""
        if (tokens != null)
            authToken = tokens.authToken
        if (authToken == "") {
            error.postValue(true)
            return
        }

        viewModelScope.launch(Dispatchers.IO) {
            val result: UserAPIService.UpdateUserResponse =
                updateUserRequirement(userId, userInfo, authToken) ?: return@launch

            if (result == null) {
                error.postValue(true)
                return@launch
            } else {
                error.postValue(false)
            }

            // Actualizar información de los tokens
            val tokens = recoverTokens()
            val cauthToken = tokens?.authToken
            val res = cauthToken?.let { updateTokensData(it) }

            if (res == null) {
                error.postValue(true)
                return@launch
            }

            if (res.tokens == null) {
                error.postValue(true)
                return@launch
            } else {
                error.postValue(false)
            }

            // Guardar tokens
            val authToken = res?.tokens?.authToken
            val refreshToken = res?.tokens?.refreshToken
            saveTokens(authToken!!, refreshToken!!)

            // Guardar usuario global
            if (res != null) {
                saveUserSession(res.user)
            }
        }
    }

    companion object {
        var phone: String = ""
        var age: String = ""
        var state: String = ""
        var gender: String = ""
    }
}
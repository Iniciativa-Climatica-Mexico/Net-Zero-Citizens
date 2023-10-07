package com.greencircle.framework.viewmodel.auth

import android.content.Context
import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.greencircle.domain.model.auth.AuthResponse
import com.greencircle.domain.usecase.auth.GoogleAuthRequirement
import com.greencircle.domain.usecase.auth.LoginCredentialsRequirement
import com.greencircle.domain.usecase.auth.SaveTokensRequirement
import com.greencircle.domain.usecase.auth.SaveUserSessionRequirement
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

/**
 * ViewModel para la autenticación y gestión de tokens de usuario.
 *
 * Esta clase ViewModel se utiliza para gestionar las operaciones relacionadas con la autenticación del usuario,
 * incluyendo el inicio de sesión con Google y la gestión de tokens de acceso y actualización.
 *
 * @param context El contexto de la aplicación Android.
 */
class LoginViewModel(private val context: Context) : ViewModel() {
    private val googleAuthRequirement = GoogleAuthRequirement()
    private val loginCredentialsRequirement = LoginCredentialsRequirement()
    private val saveTokensRequirement = SaveTokensRequirement(context)
    private val saveUserSession = SaveUserSessionRequirement(context)
    private val _googleLoginResult = MutableLiveData<AuthResponse?>()
    private val _loginCredentialsResult = MutableLiveData<AuthResponse?>()
    val googleLoginResult: LiveData<AuthResponse?> = _googleLoginResult
    val googleLoginError = MutableLiveData<Boolean>()
    val loginError = MutableLiveData<Boolean>()

    /**
     * Realiza el inicio de sesión con Google utilizando el token proporcionado.
     *
     * @param token El token de autenticación de Google.
     */
    fun googleLogin(token: String) {
        viewModelScope.launch(Dispatchers.IO) {
            val result: AuthResponse? = googleAuthRequirement(token)
            _googleLoginResult.postValue(result)

            if (result != null && result.tokens == null) {
                googleLoginError.postValue(true)
                return@launch
            } else {
                googleLoginError.postValue(false)
            }
            // Guardar tokens
            val authToken = result?.tokens?.authToken
            val refreshToken = result?.tokens?.refreshToken
            saveTokensRequirement(authToken!!, refreshToken!!)
            // Guardar usuario global
            saveUserSession(result.user)
        }
    }

    /**
     * Realiza el inicio de sesión con las credenciales del usuario (email y contraseña).
     *
     * @param email El email del usuario.
     * @param password La contraseña del usuario.
     */
    fun loginCredentials(email: String, password: String) {
        viewModelScope.launch(Dispatchers.IO) {
            val result: AuthResponse? = loginCredentialsRequirement(email, password)
            _loginCredentialsResult.postValue(result)

            if (result == null) {
                loginError.postValue(true)
                return@launch
            }

            Log.d("LoginViewModel", "result: $result")

            if (result.tokens == null) {
                loginError.postValue(true)
                return@launch
            } else {
                loginError.postValue(false)
            }

            // Guardar tokens
            val authToken = result?.tokens?.authToken
            val refreshToken = result?.tokens?.refreshToken
            saveTokensRequirement(authToken!!, refreshToken!!)
            // Guardar usuario global
            saveUserSession(result.user)
        }
    }
}
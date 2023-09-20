package com.greencircle.framework.viewmodel

import android.content.Context
import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.greencircle.data.remote.models.AuthResponse
import com.greencircle.data.repository.TokenRepository
import com.greencircle.domain.usecase.GoogleAuthRequirement
import com.greencircle.domain.usecase.RecoverTokensRequirement
import com.greencircle.domain.usecase.SaveTokensRequirement
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
    private val saveTokensRequirement = SaveTokensRequirement(context)
    private val recoverTokensRequirement = RecoverTokensRequirement(context)
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
            val authToken = result?.tokens?.authToken
            val refreshToken = result?.tokens?.refreshToken
            saveTokensRequirement(authToken!!, refreshToken!!)
            val tokens: TokenRepository.Tokens? = recoverTokensRequirement()
            // Registra en el log los tokens recuperados (solo para depuración).
            Log.d("Tokens", tokens.toString())
        }
    }
}
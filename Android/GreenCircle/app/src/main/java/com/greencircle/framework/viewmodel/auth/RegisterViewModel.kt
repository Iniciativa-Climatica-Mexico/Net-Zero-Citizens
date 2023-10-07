package com.greencircle.framework.viewmodel.auth

import android.content.Context
import android.util.Log
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.greencircle.domain.model.auth.AuthResponse
import com.greencircle.domain.model.user.NewUser
import com.greencircle.domain.usecase.auth.RegisterCredentialsRequirement
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
class RegisterViewModel(private val context: Context) : ViewModel() {
    private val registerCredentialsRequirement = RegisterCredentialsRequirement()
    private val saveTokensRequirement = SaveTokensRequirement(context)
    private val saveUserSession = SaveUserSessionRequirement(context)
    private val _registerCredentialsResult = MutableLiveData<AuthResponse?>()
    val registerCredentialsResult = _registerCredentialsResult
    val registerError = MutableLiveData<Boolean>()

    /**
     * Realiza el inicio de sesión con las credenciales del usuario (email y contraseña).
     *
     * @param email El email del usuario.
     * @param password La contraseña del usuario.
     */
    fun registerCredentials(
        user: NewUser
    ) {
        viewModelScope.launch(Dispatchers.IO) {
            val result: AuthResponse? = registerCredentialsRequirement(user)
            _registerCredentialsResult.postValue(result)

            Log.d("RegisterViewModel", "registerCredentials: $result")

            if (result == null) {
                registerError.postValue(true)
                return@launch
            }

            if (result != null && result.tokens == null) {
                registerError.postValue(true)
                return@launch
            } else {
                registerError.postValue(false)
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
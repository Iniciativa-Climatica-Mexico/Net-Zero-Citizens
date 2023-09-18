package com.greencircle.framework.viewmodel

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.greencircle.data.remote.UserAPIService
import com.greencircle.data.remote.models.AuthResponse
import com.greencircle.domain.model.UpdateUserRequirement
import com.greencircle.domain.usecase.GoogleAuthRequirement
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

/**
 * ViewModel para la creación de usuarios.
 *
 * Esta clase ViewModel se utiliza para gestionar las operaciones relacionadas con la creación de usuarios,
 * incluyendo el inicio de sesión con Google.
 */
class CreateUserViewModel : ViewModel() {
    private val googleAuthRequirement = GoogleAuthRequirement()
    private val updateUserRequirement = UpdateUserRequirement()

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
        }
    }

    fun updateUser(userId: String, userInfo: UserAPIService.UpdateUserRequest) {
        viewModelScope.launch(Dispatchers.IO) {
            val result: UserAPIService.UpdateUserResponse? =
                updateUserRequirement(userId, userInfo)
        }
    }
}
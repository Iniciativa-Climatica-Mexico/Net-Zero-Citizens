package com.greencircle.framework.viewmodel

import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.greencircle.data.remote.CompanyAPIService
import com.greencircle.data.remote.models.AuthResponse
import com.greencircle.domain.model.CreateCompanyRequirement
import com.greencircle.domain.usecase.GoogleAuthRequirement
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

/**
 * ViewModel para la creación de empresas.
 *
 * Esta clase ViewModel se utiliza para gestionar las operaciones relacionadas con la creación de empresas,
 * incluyendo el inicio de sesión con Google.
 */
class CreateCompanyViewModel : ViewModel() {
    private val googleAuthRequirement = GoogleAuthRequirement()
    private val createCompanyRequirement = CreateCompanyRequirement()

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

    fun createCompany(company: CompanyAPIService.CreateCompanyRequest, authToken: String) {
        viewModelScope.launch(Dispatchers.IO) {
            val result: CompanyAPIService.CreateCompanyResponse? =
                createCompanyRequirement(company, authToken)
            Log.d("CreateCompanyViewModel", result.toString())
        }
    }
}
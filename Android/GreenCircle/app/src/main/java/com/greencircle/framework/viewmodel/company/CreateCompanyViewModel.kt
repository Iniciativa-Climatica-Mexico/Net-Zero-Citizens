package com.greencircle.framework.viewmodel.company

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.greencircle.data.remote.company.CompanyAPIService
import com.greencircle.domain.model.auth.AuthResponse
import com.greencircle.domain.usecase.auth.GoogleAuthRequirement
import com.greencircle.domain.usecase.company.AssignCompanyRequirement
import com.greencircle.domain.usecase.company.CreateCompanyRequirement
import java.util.UUID
import kotlinx.coroutines.CoroutineScope
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
    private val assignCompanyRequirement = AssignCompanyRequirement()

    private val _googleLoginResult = MutableLiveData<AuthResponse?>()
    val googleLoginResult: LiveData<AuthResponse?> = _googleLoginResult
    val assignCompanyResult = MutableLiveData<String?>()

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

    /**
     * Crea una empresa utilizando la información proporcionada y el token de autenticación.
     *
     * @param company La información de la empresa que se va a crear.
     * @param authToken El token de autenticación necesario para realizar la creación de la empresa.
     */
    fun createCompany(company: CompanyAPIService.CreateCompanyRequest, authToken: String) {
        viewModelScope.launch(Dispatchers.IO) {
            // Invoca el modelo de dominio para crear la empresa.
            val result: CompanyAPIService.CreateCompanyResponse? =
                createCompanyRequirement(company, authToken)
        }
    }

    /**
     * Asigna una empresa a un usuario en la API.
     *
     * @param authToken El token del autentificación.
     * @param userId El id del usuario a asignar.
     * @param companyID El id de la empresa a asignar.
     * @return Un mensaje de respuesta de la API.
     */
    fun assignCompany(authToken: String, userId: UUID, companyId: UUID) {
        viewModelScope.launch(Dispatchers.IO) {
            // Invoca el modelo de dominio para asignar la empresa.
            val result: String? = assignCompanyRequirement(authToken, userId, companyId)
            CoroutineScope(Dispatchers.Main).launch {
                assignCompanyResult.postValue(result)
            }
        }
    }

    companion object {
        var name: String = ""
        var description: String = ""
        var email: String = ""
        var phone: String = ""
        var website: String = ""
        var street: String = ""
        var streetNumber: String = ""
        var city: String = ""
        var state: String = ""
        var zipCode: String = ""
    }
}
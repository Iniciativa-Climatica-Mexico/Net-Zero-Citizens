package com.greencircle.framework.viewmodel.company

import android.content.Context
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.greencircle.data.remote.company.CompanyAPIService
import com.greencircle.domain.model.auth.AuthResponse
import com.greencircle.domain.usecase.auth.GoogleAuthRequirement
import com.greencircle.domain.usecase.auth.RecoverTokensRequirement
import com.greencircle.domain.usecase.auth.SaveTokensRequirement
import com.greencircle.domain.usecase.auth.SaveUserSessionRequirement
import com.greencircle.domain.usecase.auth.UpdateTokensDataRequirement
import com.greencircle.domain.usecase.company.AssignCompanyProductsRequirement
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
class CreateCompanyViewModel(private val context: Context) : ViewModel() {
    private val googleAuthRequirement = GoogleAuthRequirement()
    private val createCompanyRequirement = CreateCompanyRequirement()
    private val assignCompanyRequirement = AssignCompanyRequirement()
    private val assignCompanyProductsRequirement = AssignCompanyProductsRequirement()
    private val saveTokens = SaveTokensRequirement(context)
    private val saveUserSession = SaveUserSessionRequirement(context)
    private val recoverTokens = RecoverTokensRequirement(context)
    private val updateTokensData = UpdateTokensDataRequirement()
    val error = MutableLiveData<Boolean>()

    private val _googleLoginResult = MutableLiveData<AuthResponse?>()
    val googleLoginResult: LiveData<AuthResponse?> = _googleLoginResult
    val assignCompanyResult = MutableLiveData<String?>()
    val assignCompanyProductsResult = MutableLiveData<Boolean>()
    val googleLoginError = MutableLiveData<Boolean>()

    private val _createCompanyResult = MutableLiveData<CompanyAPIService.CreateCompanyResponse?>()
    val createCompanyResult: LiveData<CompanyAPIService.CreateCompanyResponse?> =
        _createCompanyResult

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
            } else if (result != null && result.tokens == null) {
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
     * Crea una empresa utilizando la información proporcionada y el token de autenticación.
     *
     * @param company La información de la empresa que se va a crear.
     * @param authToken El token de autenticación necesario para realizar la creación de la empresa.
     */
    fun createCompany(company: CompanyAPIService.CreateCompanyRequest) {
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
            // Invoca el modelo de dominio para crear la empresa.
            val result: CompanyAPIService.CreateCompanyResponse =
                createCompanyRequirement(company, authToken) ?: return@launch
            if (result == null) {
                error.postValue(true)
                return@launch
            } else {
                error.postValue(false)
                _createCompanyResult.postValue(result)
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

    /**
     * Asigna una empresa a un usuario en la API.
     *
     * @param authToken El token del autentificación.
     * @param userId El id del usuario a asignar.
     * @param companyID El id de la empresa a asignar.
     * @return Un mensaje de respuesta de la API.
     */
    fun assignCompany(userId: UUID, companyId: UUID) {
        val tokens = recoverTokens()
        var authToken = ""
        if (tokens != null) {
            authToken = tokens.authToken
        }
        viewModelScope.launch(Dispatchers.IO) {
            // Invoca el modelo de dominio para asignar la empresa.
            val result: String? = assignCompanyRequirement(authToken, userId, companyId)
            CoroutineScope(Dispatchers.Main).launch {
                assignCompanyResult.postValue(result)
            }
        }
    }

    fun assignCompanyProducts(
        companyId: String,
        products: ArrayList<String>,
    ) {
        val tokens = recoverTokens()
        var authToken = ""
        if (tokens != null) {
            authToken = tokens.authToken
        }
        viewModelScope.launch(Dispatchers.IO) {
            // Invoca el modelo de dominio para asignar la empresa.
            val result: Boolean = assignCompanyProductsRequirement(authToken, companyId, products)
            CoroutineScope(Dispatchers.Main).launch {
                assignCompanyProductsResult.postValue(result)
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
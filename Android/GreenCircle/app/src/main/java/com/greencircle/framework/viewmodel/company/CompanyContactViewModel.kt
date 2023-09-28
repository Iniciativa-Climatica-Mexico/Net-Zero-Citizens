package com.greencircle.framework.viewmodel.company

import android.content.Context
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.greencircle.data.repository.CompaniesRepository
import com.greencircle.domain.model.company.Companies
import com.greencircle.domain.usecase.auth.RecoverTokensRequirement
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class CompanyContactViewModel(private val context: Context) : ViewModel() {

    private val _companyData = MutableLiveData<Companies?>()
    val companyData: MutableLiveData<Companies?> = _companyData
    private val repository: CompaniesRepository = CompaniesRepository()
    private val recoverTokens = RecoverTokensRequirement(context)

    /*
    * Inicializa el LiveData con los items de prueba para el carrusel
     */
    fun getCompanyData(companyId: String) {
        viewModelScope.launch(Dispatchers.IO) {
            val tokens = recoverTokens() ?: return@launch
            val authToken = tokens.authToken

            val response = repository.getCompanyData(authToken, companyId)
            _companyData.postValue(response)
        }
    }
}

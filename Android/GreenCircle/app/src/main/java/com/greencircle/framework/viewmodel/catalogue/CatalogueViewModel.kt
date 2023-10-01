package com.greencircle.framework.viewmodel.catalogue

import android.content.Context
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.greencircle.domain.model.company.CompanySummary
import com.greencircle.domain.usecase.auth.RecoverTokensRequirement
import com.greencircle.domain.usecase.catalogue.CatalogueRequirement
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

/**
 * Esta clase se utiliza para almacenar los datos de resumen de
 * la empresa y crear la vista de la tarjeta del catálogo de la empresa
 */

class CatalogueViewModel(private val context: Context) : ViewModel() {
    val catalogueLiveData = MutableLiveData<ArrayList<CompanySummary>?>()
    private val catalogueRequirement = CatalogueRequirement()
    private val recoverTokens = RecoverTokensRequirement(context)

    /**
     * Esta función se utiliza para obtener la lista de resumen de la empresa
     */
    fun fetchAllCompanies() {
        viewModelScope.launch(Dispatchers.IO) {
            val tokens = recoverTokens()
            if (tokens == null) {
                CoroutineScope(Dispatchers.Main).launch {
                    catalogueLiveData.postValue(null)
                }
                return@launch
            }
            val authToken = tokens.authToken

            val data = catalogueRequirement.getCatalogue(authToken)
            CoroutineScope(Dispatchers.Main).launch {
                catalogueLiveData.postValue(data)
            }
        }
    }
}
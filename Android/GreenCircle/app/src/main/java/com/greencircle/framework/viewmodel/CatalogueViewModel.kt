package com.greencircle.framework.viewmodel

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.greencircle.domain.model.CompanySummary
import com.greencircle.domain.usecase.CatalogueRequirement
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

/**
 * Esta clase se utiliza para almacenar los datos de resumen de
 * la empresa y crear la vista de la tarjeta del catálogo de la empresa
 */

class CatalogueViewModel() : ViewModel() {
    val catalogueLiveData = MutableLiveData<ArrayList<CompanySummary>>()
    private val catalogueRequirement = CatalogueRequirement()

    /**
     * Esta función se utiliza para obtener la lista de resumen de la empresa
     */
    fun fetchAllCompanies() {
        viewModelScope.launch(Dispatchers.IO) {
            val data = catalogueRequirement.getCatalogue()
            CoroutineScope(Dispatchers.Main).launch {
                catalogueLiveData.postValue(data)
            }
        }
    }
}
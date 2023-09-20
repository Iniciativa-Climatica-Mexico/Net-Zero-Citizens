package com.greencircle.framework.viewmodel

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.greencircle.domain.model.CompanySummary
import java.util.UUID

/**
 * Esta clase se utiliza para almacenar los datos de resumen de
 * la empresa y crear la vista de la tarjeta del catálogo de la empresa
 */

class CatalogueViewModel : ViewModel() {
    val catalogueLiveData = MutableLiveData<ArrayList<CompanySummary>>()

    /**
     * Esta función se utiliza para obtener la lista de resumen de la empresa
     */

    fun getCompanySummaryList() {
        catalogueLiveData.postValue(
            arrayListOf(
                CompanySummary(UUID.randomUUID(), "Company 1", "City 1", "State 1", 4.5f),
                CompanySummary(UUID.randomUUID(), "Company 2", "City 2", "State 2", 4.5f),
                CompanySummary(UUID.randomUUID(), "Company 3", "City 3", "State 3", 4.5f),
                CompanySummary(UUID.randomUUID(), "Company 4", "City 4", "State 4", 2f),
                CompanySummary(
                    UUID.randomUUID(),
                    "Company 5",
                    "City 5",
                    "State 5",
                    4.5f,
                    "https://picsum.photos/200/300"
                ),
                CompanySummary(UUID.randomUUID(), "Company 6", "City 6", "State 6", 4.5f),
                CompanySummary(UUID.randomUUID(), "Company 7", "City 7", "State 7", 4.5f)

            )
        )
    }
}
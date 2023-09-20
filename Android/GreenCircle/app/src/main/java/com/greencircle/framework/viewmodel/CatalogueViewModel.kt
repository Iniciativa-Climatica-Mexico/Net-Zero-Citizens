package com.greencircle.framework.viewmodel

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.greencircle.domain.model.CompanySummary
import java.util.UUID

/**
 * This class is used to manage the company summary data
*/

class CatalogueViewModel : ViewModel() {
    val catalogueLiveData = MutableLiveData<ArrayList<CompanySummary>>()

    /**
     * This function is used to get the company summary list
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
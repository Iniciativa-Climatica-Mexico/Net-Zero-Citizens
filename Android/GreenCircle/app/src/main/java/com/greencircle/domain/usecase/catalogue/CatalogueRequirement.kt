package com.greencircle.domain.usecase.catalogue

import android.util.Log
import com.greencircle.data.repository.CatalogueRepository
import com.greencircle.domain.model.company.CompanySummary

class CatalogueRequirement {
    val catalogueRepository = CatalogueRepository()

    suspend fun getCatalogue(): ArrayList<CompanySummary> ? {
        Log.i("Salida", "CatalogueRequirement")
        return catalogueRepository.getCatalogue()
    }
}
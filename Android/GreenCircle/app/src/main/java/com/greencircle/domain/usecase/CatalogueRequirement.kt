package com.greencircle.domain.usecase

import android.util.Log
import com.greencircle.data.repository.CatalogueRepository
import com.greencircle.domain.model.CompanySummary

class CatalogueRequirement {
    val catalogueRepository = CatalogueRepository()

    suspend fun getCatalogue(): ArrayList<CompanySummary> ? {
        Log.i("Salida", "CatalogueRequirement")
        return catalogueRepository.getCatalogue()
    }
}
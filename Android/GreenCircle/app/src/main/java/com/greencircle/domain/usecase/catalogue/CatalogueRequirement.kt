package com.greencircle.domain.usecase.catalogue

import com.greencircle.data.repository.CatalogueRepository
import com.greencircle.domain.model.company.CompanySummary

class CatalogueRequirement {
    private val catalogueRepository = CatalogueRepository()

    suspend fun getCatalogue(authToken: String): ArrayList<CompanySummary> ? {
        return catalogueRepository.getCatalogue(authToken)
    }
}
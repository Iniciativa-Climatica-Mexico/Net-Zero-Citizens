package com.greencircle.data.repository

import com.greencircle.data.remote.catalogue.CatalogueAPIClient
import com.greencircle.domain.model.company.CompanySummary

class CatalogueRepository {
    private var apiCatalogue = CatalogueAPIClient()

    suspend fun getCatalogue(): ArrayList<CompanySummary> ? {
        return apiCatalogue.getCatalogue()
    }
}
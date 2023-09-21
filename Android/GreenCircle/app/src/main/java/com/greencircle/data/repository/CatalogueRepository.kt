package com.greencircle.data.repository

import com.greencircle.data.remote.CatalogueAPIClient
import com.greencircle.domain.model.CompanySummary
import java.util.UUID

class CatalogueRepository {
    private var apiCatalogue = CatalogueAPIClient()

    suspend fun getCatalogue(): ArrayList<CompanySummary> ? {
        return apiCatalogue.getCatalogue()
    }
}
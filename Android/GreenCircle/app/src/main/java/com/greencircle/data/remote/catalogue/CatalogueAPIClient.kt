package com.greencircle.data.remote.catalogue

import com.greencircle.data.remote.NetworkModel
import com.greencircle.domain.model.company.CompanySummary

class CatalogueAPIClient {
    private lateinit var api: CatalogueAPIService

    suspend fun getCatalogue(authToken: String): ArrayList<CompanySummary>? {
        api = NetworkModel(authToken, CatalogueAPIService::class.java)
        return try {
            val response = api.getCatalogue()
            response.rows
        } catch (e: Exception) {
            null
        }
    }
}
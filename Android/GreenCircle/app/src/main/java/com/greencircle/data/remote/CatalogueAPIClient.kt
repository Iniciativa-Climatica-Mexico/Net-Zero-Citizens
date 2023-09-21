package com.greencircle.data.remote

import android.util.Log
import com.greencircle.domain.model.CompanySummary

class CatalogueAPIClient {
    private lateinit var api: CatalogueAPIService

    suspend fun getCatalogue(): ArrayList<CompanySummary>? {
        api = CatalogueNetworkModel()
        return try {
            val response = api.getCatalogue()
            response.rows
        } catch (e: Exception) {
            Log.i("Salida", "Error: $e")
            null
        }
    }
}
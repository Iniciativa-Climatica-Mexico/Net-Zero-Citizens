package com.greencircle.data.repository

import android.util.Log
import com.greencircle.data.remote.catalogue.CatalogueAPIClient
import com.greencircle.domain.model.company.CompanyParams
import com.greencircle.domain.model.company.CompanySummary

class CatalogueRepository {
    private var apiCatalogue = CatalogueAPIClient()

    suspend fun getCatalogue(authToken: String, params: CompanyParams): ArrayList<CompanySummary>
    ? {
        val data = apiCatalogue.getCatalogue(authToken, params)
        Log.d("CatalogueRepository", "getCatalogue: $data")
        return data
    }
    suspend fun getCompanyData(authToken: String, idCompany: String): CompanySummary? {
        return apiCatalogue.getCompanyById(authToken, idCompany)
    }
}
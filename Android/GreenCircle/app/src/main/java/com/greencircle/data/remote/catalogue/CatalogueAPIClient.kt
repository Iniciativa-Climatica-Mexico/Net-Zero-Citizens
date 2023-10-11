package com.greencircle.data.remote.catalogue

import android.util.Log
import com.greencircle.data.remote.NetworkModel
import com.greencircle.domain.model.company.CompanyParams
import com.greencircle.domain.model.company.CompanySummary

class CatalogueAPIClient {
    private lateinit var api: CatalogueAPIService

    suspend fun getCatalogue(authToken: String, params: CompanyParams): ArrayList<CompanySummary>? {
        val api = NetworkModel(authToken, CatalogueAPIService::class.java)
        return try {
            val mapParams = HashMap<String, Any>()
            mapParams["ordering"] = params.ordering
            mapParams["name"] = params.name
            mapParams["state"] = params.state
            mapParams["productName"] = params.productName
            mapParams["latitude"] = params.latitude
            mapParams["longitude"] = params.longitude
            val response = api.getCatalogue(mapParams)
            response.rows
        } catch (e: Exception) {
            Log.e("CatalogueAPIClient", "getCatalogue: ${e.message}")
            e.printStackTrace()
            null
        }
    }
    suspend fun getCompanyById(authToken: String, companyID: String): CompanySummary? {
        api = NetworkModel(authToken, CatalogueAPIService::class.java)
        return try {
            api.getCompany(companyID)
        } catch (e: java.lang.Exception) {
            e.printStackTrace()
            null
        }
    }
}
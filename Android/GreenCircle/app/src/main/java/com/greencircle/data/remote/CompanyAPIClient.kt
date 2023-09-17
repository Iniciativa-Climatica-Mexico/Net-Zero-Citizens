package com.greencircle.data.remote

import android.util.Log
import com.greencircle.data.remote.models.Company

class CompanyAPIClient {
    private lateinit var api: CompanyAPIService

    class CompanyAPIClient()

    suspend fun createCompany(company: Company): CompanyAPIService.CreateCompanyResponse? {
        api = CompanyNetworkModel()
        Log.d("CreateCompany", "Fetching data from API")
        return try {
            val response = api.createCompany(company)
            Log.d("CreateCompany", "Res: $response")
            response
        } catch (e: Exception) {
            e.printStackTrace()
            Log.e("CreateCompany", "Error: $e")
            null
        }
    }
}
package com.greencircle.data.repository

import android.util.Log
import com.greencircle.data.remote.company.CompanyAPIClient
import com.greencircle.domain.model.company.Companies

class CompaniesRepository {
    private val api = CompanyAPIClient()

    suspend fun getCompanyData(idCompany: String): Companies? {
        val response = api.getCompanyById(idCompany)
        Log.i("Start", "Response: $response")
        return response
    }
}
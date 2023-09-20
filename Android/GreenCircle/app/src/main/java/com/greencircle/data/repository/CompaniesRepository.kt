package com.greencircle.data.repository

import android.util.Log
import com.greencircle.data.remote.CompanyAPIClient
import com.greencircle.domain.model.Companies

class CompaniesRepository {
    private val api = CompanyAPIClient()

    suspend fun getCompanyData(): Companies? {
        val response = api.getCompanyById("c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e")
        Log.i("Start", "Response: $response")
        return response
    }
}
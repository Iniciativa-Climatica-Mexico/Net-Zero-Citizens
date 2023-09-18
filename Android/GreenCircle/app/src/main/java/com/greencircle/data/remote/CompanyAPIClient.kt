package com.greencircle.data.remote

import android.util.Log
import com.greencircle.domain.model.Companies

class CompanyAPIClient {
    private lateinit var api: CompanyAPIService

    suspend fun getCompanyById(companyID: String): Companies? {
        api = CompanyNetworkModuleDI()
        return try {
            api.getCompany(companyID)
        } catch (e: java.lang.Exception) {
            Log.d("customErrCompany", e.toString())
            e.printStackTrace()
            null
        }
    }
}
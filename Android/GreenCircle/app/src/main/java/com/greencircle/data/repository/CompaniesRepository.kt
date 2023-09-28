package com.greencircle.data.repository

import com.greencircle.data.remote.company.CompanyAPIClient
import com.greencircle.domain.model.company.Companies

class CompaniesRepository {
    private val api = CompanyAPIClient()

    suspend fun getCompanyData(authToken: String, idCompany: String): Companies? {
        return api.getCompanyById(authToken, idCompany)
    }
}
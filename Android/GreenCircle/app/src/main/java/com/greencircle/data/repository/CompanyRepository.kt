package com.greencircle.data.repository

import com.greencircle.data.remote.CompanyAPIClient
import com.greencircle.data.remote.CompanyAPIService

class CompanyRepository {
    private val apiCompany = CompanyAPIClient()
    suspend fun createCompany(
        company: CompanyAPIService.CreateCompanyRequest,
        authToken: String
    ): CompanyAPIService.CreateCompanyResponse? =
        apiCompany.createCompany(company, authToken)
}
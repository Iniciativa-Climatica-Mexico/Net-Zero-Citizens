package com.greencircle.data.repository

import com.greencircle.data.remote.CompanyAPIClient
import com.greencircle.data.remote.CompanyAPIService
import com.greencircle.data.remote.models.Company

class CompanyRepository {
    private val apiCompany = CompanyAPIClient()
    suspend fun createCompany(company: Company): CompanyAPIService.CreateCompanyResponse? =
        apiCompany.createCompany(company)
}
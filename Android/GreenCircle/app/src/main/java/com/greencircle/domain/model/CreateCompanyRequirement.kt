package com.greencircle.domain.model

import com.greencircle.data.remote.CompanyAPIService
import com.greencircle.data.repository.CompanyRepository

class CreateCompanyRequirement {
    private val repository = CompanyRepository()
    suspend operator fun invoke(
        company: CompanyAPIService.CreateCompanyRequest,
        authToken: String
    ): CompanyAPIService.CreateCompanyResponse? =
        repository.createCompany(company, authToken)
}
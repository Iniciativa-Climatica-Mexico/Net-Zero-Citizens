package com.greencircle.domain.model

import com.greencircle.data.remote.CompanyAPIService
import com.greencircle.data.remote.models.Company
import com.greencircle.data.repository.CompanyRepository

class CreateCompanyRequirement {
    private val repository = CompanyRepository()
    suspend operator fun invoke(company: Company): CompanyAPIService.CreateCompanyResponse? =
        repository.createCompany(company)
}
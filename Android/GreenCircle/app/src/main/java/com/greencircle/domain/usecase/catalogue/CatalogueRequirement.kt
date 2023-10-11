package com.greencircle.domain.usecase.catalogue

import com.greencircle.data.repository.CatalogueRepository
import com.greencircle.domain.model.company.CompanyParams
import com.greencircle.domain.model.company.CompanySummary

class CatalogueRequirement {
    private val catalogueRepository = CatalogueRepository()

    suspend fun getCatalogue(authToken: String, params: CompanyParams): ArrayList<CompanySummary>
    ? {
        return catalogueRepository.getCatalogue(authToken, params)
    }
    suspend fun getCompanyData(authToken: String, idCompany: String): CompanySummary? {
        return catalogueRepository.getCompanyData(authToken, idCompany)
    }
}
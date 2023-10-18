package com.greencircle.domain.usecase.catalogue

import com.greencircle.data.repository.CatalogueRepository
import com.greencircle.data.repository.FavouritesRepository
import com.greencircle.domain.model.company.CompanyParams
import com.greencircle.domain.model.company.CompanySummary
import java.util.UUID

class CatalogueRequirement {
    private val catalogueRepository = CatalogueRepository()
    private val favouritesRepository = FavouritesRepository()

    suspend fun getCatalogue(
        authToken: String,
        userId: UUID,
        params: CompanyParams
    ): ArrayList<CompanySummary>
    ? {
        val company = catalogueRepository.getCatalogue(authToken, params)
        val favourites = favouritesRepository.getAllFavouritesByUser(authToken, userId)
        if (company != null && favourites != null) {
            for (favourite in favourites.rows) {
                for (companySummary in company) {
                    if (favourite.companyId == companySummary.companyId) {
                        companySummary.isFavourite = true
                    }
                }
            }
            return company
        }
        return null
    }

    suspend fun getCompanyData(authToken: String, idCompany: String): CompanySummary? {
        return catalogueRepository.getCompanyData(authToken, idCompany)
    }
}
package com.greencircle.data.remote.catalogue

import com.greencircle.domain.model.catalogue.CatalogueResponse
import com.greencircle.domain.model.company.CompanySummary
import retrofit2.http.GET
import retrofit2.http.Path

interface CatalogueAPIService {
    @GET("company/approved")
    suspend fun getCatalogue(): CatalogueResponse

    @GET("company/{id}")
    suspend fun getCompany(
        @Path("id") id: String
    ): CompanySummary
}
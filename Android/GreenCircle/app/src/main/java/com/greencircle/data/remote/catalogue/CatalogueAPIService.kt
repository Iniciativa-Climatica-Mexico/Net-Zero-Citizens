package com.greencircle.data.remote.catalogue

import com.greencircle.domain.model.catalogue.CatalogueResponse
import com.greencircle.domain.model.company.CompanySummary
import retrofit2.http.GET
import retrofit2.http.Path
import retrofit2.http.QueryMap

interface CatalogueAPIService {
    @GET("company/approved")
    @JvmSuppressWildcards
    suspend fun getCatalogue(@QueryMap params: Map<String, Any>): CatalogueResponse

    @GET("company/{id}")
    suspend fun getCompany(
        @Path("id") id: String
    ): CompanySummary
}
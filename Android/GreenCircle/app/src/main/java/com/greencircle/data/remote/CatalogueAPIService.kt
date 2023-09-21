package com.greencircle.data.remote

import com.greencircle.data.remote.models.CatalogueResponse
import retrofit2.http.GET

interface CatalogueAPIService {
    @GET("company/")
    suspend fun getCatalogue(): CatalogueResponse
}
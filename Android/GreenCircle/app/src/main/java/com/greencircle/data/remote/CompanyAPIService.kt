package com.greencircle.data.remote

import com.greencircle.domain.model.Companies
import retrofit2.http.GET
import retrofit2.http.Path

interface CompanyAPIService {

    @GET("company/{id}")
    suspend fun getCompany(
        @Path("id") id: String
    ): Companies
}
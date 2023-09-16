package com.greencircle.data.remote

import retrofit2.http.Body
import retrofit2.http.POST

public interface CompanyAPIService {
    @POST("company/new")
    suspend fun createCompany(@Body request: CreateCompanyRequest): CreateCompanyResponse
}
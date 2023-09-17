package com.greencircle.data.remote

import com.greencircle.data.remote.models.Company
import retrofit2.http.Body
import retrofit2.http.POST

interface CompanyAPIService {
    data class CreateCompanyResponse(
        val companyId: String?,
        val message: String?,
        val error: String?
    )

    @POST("company/create")
    suspend fun createCompany(@Body request: Company): CreateCompanyResponse
}
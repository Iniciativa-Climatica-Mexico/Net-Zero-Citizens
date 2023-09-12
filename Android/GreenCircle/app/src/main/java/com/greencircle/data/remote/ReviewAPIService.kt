package com.greencircle.data.remote

import com.greencircle.domain.model.CompanyReviewObject
import retrofit2.http.GET
import retrofit2.http.Path

interface ReviewAPIService {
    // http:localhost:3000/api/v1/review/company/{companyId}
    @GET("review/company/{companyId}")
    suspend fun getCompanyReviews(
        @Path("companyId") companyId: String
    ): CompanyReviewObject
}
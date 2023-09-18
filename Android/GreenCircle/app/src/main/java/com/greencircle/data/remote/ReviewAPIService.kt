package com.greencircle.data.remote

import com.greencircle.domain.model.CompanyReviewObject
import com.greencircle.domain.model.UserReviewObject
import retrofit2.http.GET
import retrofit2.http.Path

interface ReviewAPIService {
    // http:localhost:3000/api/v1/review/company/{companyId}
    @GET("review/company/{companyId}")
    suspend fun getCompanyReviews(
        @Path("companyId") companyId: String
    ): CompanyReviewObject

    @GET("review/user/{UUID}")
    suspend fun getUserReviews(
        @Path("UUID") UUID: String
    ): UserReviewObject
}
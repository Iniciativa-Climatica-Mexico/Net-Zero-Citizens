package com.greencircle.data.remote

import com.greencircle.domain.model.CompanyReviewObject
import com.greencircle.domain.model.ReviewBase
import com.greencircle.domain.model.UserReviewObject
import okhttp3.ResponseBody
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.PUT
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

    @POST("review/{UUID}/{companyId}")
    suspend fun addReview(
        @Path("UUID") UUID: String,
        @Path("companyId") companyId: String,
        @Body review: ReviewBase
    ): Response<ResponseBody>

    @PUT("review/{reviewId}")
    suspend fun updateReview(
        @Path("reviewId") reviewId: String,
        @Body review: ReviewBase
    ): Response<ResponseBody>

    @DELETE("review/{reviewId}")
    suspend fun deleteReview(
        @Path("reviewId") reviewId: String
    ): Response<ResponseBody>
}
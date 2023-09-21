package com.greencircle.data.remote

import com.greencircle.domain.model.CompanyReviewObject
import com.greencircle.domain.model.ReviewBase
import com.greencircle.domain.model.UserReviewObject
import java.util.UUID
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
    suspend fun getCompanyReviews(@Path("companyId") companyId: UUID): CompanyReviewObject

    @GET("review/user/{userId}")
    suspend fun getUserReviews(@Path("userId") userId: UUID): UserReviewObject

    @POST("review/{userId}/{companyId}")
    suspend fun addReview(
            @Path("userId") userId: UUID,
            @Path("companyId") companyId: UUID,
            @Body review: ReviewBase
    ): Response<ResponseBody>

    @PUT("review/{reviewId}")
    suspend fun updateReview(
            @Path("reviewId") reviewId: UUID,
            @Body review: ReviewBase
    ): Response<ResponseBody>

    @DELETE("review/{reviewId}")
    suspend fun deleteReview(@Path("reviewId") reviewId: UUID): Response<ResponseBody>
}

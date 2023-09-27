package com.greencircle.data.repository

import android.util.Log
import com.greencircle.data.remote.reviews.ReviewAPIClient
import com.greencircle.domain.model.reviews.CompanyReviewObject
import com.greencircle.domain.model.reviews.ReviewBase
import com.greencircle.domain.model.reviews.UserReviewObject
import java.util.UUID
import okhttp3.ResponseBody
import retrofit2.Response

class ReviewRepository {
    private val api = ReviewAPIClient()
    suspend fun getCompanyReviews(authToken: String, companyId: UUID): CompanyReviewObject? {
        return api.getCompanyReviews(authToken, companyId)
    }

    suspend fun getUserReviews(authToken: String, userId: UUID): UserReviewObject? {
        return api.getUserReviews(authToken, userId)
    }

    suspend fun addReview(
        authToken: String,
        userId: UUID,
        companyId: UUID,
        review: ReviewBase
    ): Response<ResponseBody>? {
        val response = api.addReview(authToken, userId, companyId, review)
        if (response != null && response.isSuccessful) {
            Log.d("POST", response.toString())
        } else {
            Log.e("POST", "Error en la solicitud: $response")
        }
        return response
    }

    suspend fun updateReview(
        authToken: String,
        reviewId: UUID,
        review: ReviewBase
    ): Response<ResponseBody>? {
        return api.updateReview(authToken, reviewId, review)
    }

    suspend fun deleteReview(
        authToken: String,
        reviewId: UUID
    ): Response<ResponseBody>? {
        return api.deleteReview(authToken, reviewId)
    }
}
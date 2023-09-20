package com.greencircle.data.repository

import android.util.Log
import com.greencircle.data.remote.ReviewAPIClient
import com.greencircle.domain.model.CompanyReviewObject
import com.greencircle.domain.model.ReviewBase
import com.greencircle.domain.model.UserReviewObject
import java.util.UUID
import okhttp3.ResponseBody
import retrofit2.Response

class ReviewRepository {
    private val api = ReviewAPIClient()
    suspend fun getCompanyReviews(companyId: UUID): CompanyReviewObject? {
        return api.getCompanyReviews(companyId)
    }

    suspend fun getUserReviews(userId: UUID): UserReviewObject? {
        return api.getUserReviews(userId)
    }

    suspend fun addReview(
        userId: UUID,
        companyId: UUID,
        review: ReviewBase
    ): Response<ResponseBody>? {
        val response = api.addReview(userId, companyId, review)
        if (response != null && response.isSuccessful) {
            Log.d("POST", response.toString())
        } else {
            Log.e("POST", "Error en la solicitud: $response")
        }
        return response
    }

    suspend fun updateReview(
        reviewId: UUID,
        review: ReviewBase
    ): Response<ResponseBody>? {
        return api.updateReview(reviewId, review)
    }

    suspend fun deleteReview(
        reviewId: UUID
    ): Response<ResponseBody>? {
        return api.deleteReview(reviewId)
    }
}
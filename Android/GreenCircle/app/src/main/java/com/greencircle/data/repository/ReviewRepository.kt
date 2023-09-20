package com.greencircle.data.repository

import android.util.Log
import com.greencircle.data.remote.ReviewAPIClient
import com.greencircle.domain.model.CompanyReviewObject
import com.greencircle.domain.model.ReviewBase
import com.greencircle.domain.model.UserReviewObject
import okhttp3.ResponseBody
import retrofit2.Response

class ReviewRepository {
    private val api = ReviewAPIClient()
    suspend fun getCompanyReviews(companyId: String): CompanyReviewObject? {
        val response = api.getCompanyReviews(companyId)
        Log.d("prueba", response.toString())
        return response
    }

    suspend fun getUserReviews(UUID: String): UserReviewObject? {
        val response = api.getUserReviews(UUID)
        Log.d("prueba", response.toString())
        return response
    }

    suspend fun addReview(
        userId: String,
        companyId: String,
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
        reviewId: String,
        review: ReviewBase
    ): Response<ResponseBody>? {
        val response = api.updateReview(reviewId, review)
        Log.d("PUT", response.toString())
        return response
    }

    suspend fun deleteReview(
        reviewId: String
    ): Response<ResponseBody>? {
        val response = api.deleteReview(reviewId)
        Log.d("DELETE", response.toString())
        return response
    }
}
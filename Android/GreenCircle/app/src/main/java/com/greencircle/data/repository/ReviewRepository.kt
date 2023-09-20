package com.greencircle.data.repository

import android.util.Log
import com.greencircle.data.remote.ReviewAPIClient
import com.greencircle.domain.model.CompanyReviewObject
import com.greencircle.domain.model.ReviewBase
import com.greencircle.domain.model.UserReviewObject
import okhttp3.ResponseBody
import retrofit2.Response
import java.util.UUID

class ReviewRepository {
    private val api = ReviewAPIClient()
    suspend fun getCompanyReviews(companyId: UUID): CompanyReviewObject? {
        return api.getCompanyReviews(companyId)
    }

    suspend fun getUserReviews(UUID: UUID): UserReviewObject? {
        return api.getUserReviews(UUID)
    }

    suspend fun addReview(
        UUID: UUID,
        companyId: UUID,
        review: ReviewBase
    ): Response<ResponseBody>? {
        return api.addReview(UUID, companyId, review)
    }

    suspend fun updateReview(
        reviewId: UUID,
        review: ReviewBase
    ): Response<ResponseBody>? {
        val response = api.updateReview(reviewId, review)
        Log.d("PUT", response.toString())
        return response
    }

    suspend fun deleteReview(
        reviewId: UUID
    ): Response<ResponseBody>? {
        val response = api.deleteReview(reviewId)
        Log.d("DELETE", response.toString())
        return response
    }
}
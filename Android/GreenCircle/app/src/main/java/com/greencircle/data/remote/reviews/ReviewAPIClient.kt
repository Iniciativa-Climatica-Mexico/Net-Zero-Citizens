package com.greencircle.data.remote.reviews

import com.greencircle.data.remote.NetworkModel
import com.greencircle.domain.model.reviews.CompanyReviewObject
import com.greencircle.domain.model.reviews.ReviewBase
import com.greencircle.domain.model.reviews.UserReviewObject
import java.util.UUID
import okhttp3.ResponseBody
import retrofit2.Response

class ReviewAPIClient {
    private lateinit var api: ReviewAPIService
    suspend fun getCompanyReviews(authToken: String, companyId: UUID): CompanyReviewObject? {
        api = NetworkModel(authToken, ReviewAPIService::class.java)
        return try {
            return api.getCompanyReviews(companyId)
        } catch (e: java.lang.Exception) {
            e.printStackTrace()
            null
        }
    }

    suspend fun getUserReviews(authToken: String, userId: UUID): UserReviewObject? {
        api = NetworkModel(authToken, ReviewAPIService::class.java)
        return try {
            return api.getUserReviews(userId)
        } catch (e: java.lang.Exception) {
            e.printStackTrace()
            null
        }
    }

    suspend fun addReview(
        authToken: String,
        userId: UUID,
        companyId: UUID,
        review: ReviewBase
    ): Response<ResponseBody>? {
        api = NetworkModel(authToken, ReviewAPIService::class.java)
        return try {
            val response = api.addReview(userId, companyId, review)
            return response
        } catch (e: java.lang.Exception) {
            e.printStackTrace()
            null
        }
    }

    suspend fun updateReview(
        authToken: String,
        reviewId: UUID,
        review: ReviewBase
    ): Response<ResponseBody>? {
        api = NetworkModel(authToken, ReviewAPIService::class.java)
        return try {
            api.updateReview(reviewId, review)
        } catch (e: java.lang.Exception) {
            e.printStackTrace()
            null
        }
    }

    suspend fun deleteReview(
        authToken: String,
        reviewId: UUID
    ): Response<ResponseBody>? {
        api = NetworkModel(authToken, ReviewAPIService::class.java)
        return try {
            api.deleteReview(reviewId)
        } catch (e: java.lang.Exception) {
            e.printStackTrace()
            null
        }
    }
}
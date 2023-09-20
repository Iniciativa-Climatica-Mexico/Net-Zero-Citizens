package com.greencircle.data.remote

import android.util.Log
import com.greencircle.domain.model.CompanyReviewObject
import com.greencircle.domain.model.ReviewBase
import com.greencircle.domain.model.UserReviewObject
import okhttp3.ResponseBody
import retrofit2.Response
import java.util.UUID

class ReviewAPIClient {
    private lateinit var api: ReviewAPIService
    suspend fun getCompanyReviews(companyId: UUID): CompanyReviewObject? {
        api = ReviewNetworkModuleDI()
        return try {
            api.getCompanyReviews(companyId)
        } catch (e: java.lang.Exception) {
            e.printStackTrace()
            null
        }
    }

    suspend fun getUserReviews(UUID: UUID): UserReviewObject? {
        api = ReviewNetworkModuleDI()
        return try {
            api.getUserReviews(UUID)
        } catch (e: java.lang.Exception) {
            e.printStackTrace()
            null
        }
    }

    suspend fun addReview(
        UUID: UUID,
        companyId: UUID,
        review: ReviewBase
    ): Response<ResponseBody>? {
        api = ReviewNetworkModuleDI()
        return try {
            api.addReview(UUID, companyId, review)
        } catch (e: java.lang.Exception) {
            e.printStackTrace()
            null
        }
    }

    suspend fun updateReview(
        reviewId: UUID,
        review: ReviewBase
    ): Response<ResponseBody>? {
        api = ReviewNetworkModuleDI()
        return try {
            api.updateReview(reviewId, review)
        } catch (e: java.lang.Exception) {
            Log.d("customErr", e.toString())
            e.printStackTrace()
            null
        }
    }

    suspend fun deleteReview(
        reviewId: UUID
    ): Response<ResponseBody>? {
        api = ReviewNetworkModuleDI()
        return try {
            api.deleteReview(reviewId)
        } catch (e: java.lang.Exception) {
            Log.d("customErr", e.toString())
            e.printStackTrace()
            null
        }
    }
}
package com.greencircle.data.remote

import android.util.Log
import com.greencircle.domain.model.CompanyReviewObject
import com.greencircle.domain.model.ReviewBase
import com.greencircle.domain.model.UserReviewObject
import okhttp3.ResponseBody
import retrofit2.Response

class ReviewAPIClient {
    private lateinit var api: ReviewAPIService
    suspend fun getCompanyReviews(companyId: String): CompanyReviewObject? {
        api = ReviewNetworkModuleDI()
        return try {
            api.getCompanyReviews(companyId)
        } catch (e: java.lang.Exception) {
            Log.d("customErr", e.toString())
            e.printStackTrace()
            null
        }
    }

    suspend fun getUserReviews(userId: String): UserReviewObject? {
        api = ReviewNetworkModuleDI()
        return try {
            api.getUserReviews(userId)
        } catch (e: java.lang.Exception) {
            Log.d("customErr", e.toString())
            e.printStackTrace()
            null
        }
    }

    suspend fun addReview(
        userId: String,
        companyId: String,
        review: ReviewBase
    ): Response<ResponseBody>? {
        api = ReviewNetworkModuleDI()
        return try {
            api.addReview(userId, companyId, review)
        } catch (e: java.lang.Exception) {
            Log.d("customErr", e.toString())
            e.printStackTrace()
            null
        }
    }

    suspend fun updateReview(
        reviewId: String,
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
        reviewId: String
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
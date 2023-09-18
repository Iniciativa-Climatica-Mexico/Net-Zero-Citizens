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
        Log.d("companyId", companyId)
        return try {
            api.getCompanyReviews(companyId)
        } catch (e: java.lang.Exception) {
            Log.d("customErr", e.toString())
            e.printStackTrace()
            null
        }
    }

    suspend fun getUserReviews(UUID: String): UserReviewObject? {
        api = ReviewNetworkModuleDI()
        Log.d("UUID", UUID)
        return try {
            api.getUserReviews(UUID)
        } catch (e: java.lang.Exception) {
            Log.d("customErr", e.toString())
            e.printStackTrace()
            null
        }
    }

    suspend fun addReview(
        UUID: String,
        companyId: String,
        review: ReviewBase
    ): Response<ResponseBody>? {
        api = ReviewNetworkModuleDI()
        return try {
            api.addReview(UUID, companyId, review)
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
}
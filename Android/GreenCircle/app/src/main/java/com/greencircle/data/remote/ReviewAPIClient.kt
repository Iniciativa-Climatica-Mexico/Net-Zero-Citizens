package com.greencircle.data.remote

import android.util.Log
import com.greencircle.domain.model.CompanyReviewObject
import com.greencircle.domain.model.ReviewBase
import com.greencircle.domain.model.UserReviewObject
import java.util.UUID
import okhttp3.ResponseBody
import retrofit2.Response

class ReviewAPIClient {
    private lateinit var api: ReviewAPIService
    suspend fun getCompanyReviews(companyId: UUID): CompanyReviewObject? {
        api = ReviewNetworkModuleDI()
        return try {
            val response = api.getCompanyReviews(companyId)
            Log.d("response", response.toString())
            return response
        } catch (e: java.lang.Exception) {
            e.printStackTrace()
            null
        }
    }

    suspend fun getUserReviews(userId: UUID): UserReviewObject? {
>>>>>>>>> Temporary merge branch 2
        api = ReviewNetworkModuleDI()
        return try {
            api.getUserReviews(userId)
        } catch (e: java.lang.Exception) {
            e.printStackTrace()
            null
        }
    }

    suspend fun addReview(
        userId: UUID,
        companyId: UUID,
        review: ReviewBase
    ): Response<ResponseBody>? {
        api = ReviewNetworkModuleDI()
        return try {
            api.addReview(userId, companyId, review)
        } catch (e: java.lang.Exception) {
            e.printStackTrace()
            null
        }
    }

    suspend fun updateReview(reviewId: UUID, review: ReviewBase): Response<ResponseBody>? {
        api = ReviewNetworkModuleDI()
        return try {
            api.updateReview(reviewId, review)
        } catch (e: java.lang.Exception) {
            Log.d("customErr", e.toString())
            e.printStackTrace()
            null
        }
    }

    suspend fun deleteReview(reviewId: UUID): Response<ResponseBody>? {
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

package com.greencircle.data.remote

import android.util.Log // ktlint-disable import-ordering
import com.greencircle.domain.model.CompanyReviewObject // ktlint-disable import-ordering
import com.greencircle.domain.model.ReviewBase // ktlint-disable import-ordering
import com.greencircle.domain.model.UserReviewObject // ktlint-disable import-ordering
import okhttp3.ResponseBody // ktlint-disable import-ordering
import retrofit2.Response // ktlint-disable import-ordering

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
}
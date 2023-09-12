package com.greencircle.data.remote

import android.util.Log
import com.greencircle.domain.model.CompanyReviewObject

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
}
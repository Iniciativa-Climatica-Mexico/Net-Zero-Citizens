package com.greencircle.data.repository

import android.util.Log
import com.greencircle.data.remote.ReviewAPIClient
import com.greencircle.domain.model.CompanyReviewObject

class ReviewRepository {
    private val api = ReviewAPIClient()
    suspend fun getCompanyReviews(companyId: String): CompanyReviewObject? {
        val response = api.getCompanyReviews(companyId)
        Log.d("prueba", response.toString())
        return response
    }
}
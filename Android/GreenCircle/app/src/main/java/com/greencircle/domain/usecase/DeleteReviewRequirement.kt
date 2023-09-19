package com.greencircle.domain.usecase

import com.greencircle.data.repository.ReviewRepository
import okhttp3.ResponseBody
import retrofit2.Response

class DeleteReviewRequirement {
    private val repository = ReviewRepository()

    suspend operator fun invoke(
        reviewId: String
    ): Response<ResponseBody>? = repository.deleteReview(reviewId)
}
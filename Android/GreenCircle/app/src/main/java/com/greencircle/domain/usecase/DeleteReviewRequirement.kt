package com.greencircle.domain.usecase

import com.greencircle.data.repository.ReviewRepository
import java.util.UUID
import okhttp3.ResponseBody
import retrofit2.Response
import java.util.UUID

class DeleteReviewRequirement {
    private val repository = ReviewRepository()

    suspend operator fun invoke(
        reviewId: UUID
    ): Response<ResponseBody>? = repository.deleteReview(reviewId)
}
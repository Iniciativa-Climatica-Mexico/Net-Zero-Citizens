package com.greencircle.domain.usecase

import com.greencircle.data.repository.ReviewRepository
import com.greencircle.domain.model.ReviewBase
import okhttp3.ResponseBody
import retrofit2.Response
import java.util.UUID

class UpdateReviewRequirement {
    private val repository = ReviewRepository()

    suspend operator fun invoke(
        reviewId: UUID,
        review: ReviewBase
    ): Response<ResponseBody>? =
        repository.updateReview(reviewId, review)
}
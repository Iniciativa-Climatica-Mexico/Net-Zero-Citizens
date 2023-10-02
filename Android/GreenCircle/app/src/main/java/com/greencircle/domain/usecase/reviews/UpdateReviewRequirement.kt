package com.greencircle.domain.usecase.reviews

import com.greencircle.data.repository.ReviewRepository
import com.greencircle.domain.model.reviews.ReviewBase
import java.util.UUID
import okhttp3.ResponseBody
import retrofit2.Response

class UpdateReviewRequirement {
    private val repository = ReviewRepository()

    suspend operator fun invoke(
        authToken: String,
        reviewId: UUID,
        review: ReviewBase
    ): Response<ResponseBody>? =
        repository.updateReview(authToken, reviewId, review)
}
package com.greencircle.domain.usecase.reviews

import com.greencircle.data.repository.ReviewRepository
import java.util.UUID
import okhttp3.ResponseBody
import retrofit2.Response

class DeleteReviewRequirement {
    private val repository = ReviewRepository()

    suspend operator fun invoke(
        authToken: String,
        reviewId: UUID
    ): Response<ResponseBody>? = repository.deleteReview(authToken, reviewId)
}
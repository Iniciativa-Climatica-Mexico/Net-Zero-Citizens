package com.greencircle.domain.usecase

import com.greencircle.data.repository.ReviewRepository
import com.greencircle.domain.model.ReviewBase
import okhttp3.ResponseBody
import retrofit2.Response
import java.util.UUID

class AddReviewRequirement {
    private val repository = ReviewRepository()

    suspend operator fun invoke(
        UUID: UUID,
        companyId: UUID,
        review: ReviewBase
    ): Response<ResponseBody>? =
        repository.addReview(UUID, companyId, review)
}
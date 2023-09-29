package com.greencircle.domain.usecase.reviews

import com.greencircle.data.repository.ReviewRepository
import com.greencircle.domain.model.reviews.UserReviewObject
import java.util.UUID

class UserReviewListRequirement {
    private val repository = ReviewRepository()
    suspend operator fun invoke(authToken: String, userId: UUID): UserReviewObject? =
        repository.getUserReviews(authToken, userId)
}
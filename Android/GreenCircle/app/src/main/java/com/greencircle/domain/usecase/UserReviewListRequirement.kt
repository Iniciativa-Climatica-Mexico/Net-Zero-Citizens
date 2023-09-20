package com.greencircle.domain.usecase

import com.greencircle.data.repository.ReviewRepository
import com.greencircle.domain.model.UserReviewObject
import java.util.UUID

class UserReviewListRequirement {
    private val repository = ReviewRepository()
    suspend operator fun invoke(UUID: UUID): UserReviewObject? =
        repository.getUserReviews(UUID)
}
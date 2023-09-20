package com.greencircle.domain.usecase

import com.greencircle.data.repository.ReviewRepository
import com.greencircle.domain.model.UserReviewObject

class UserReviewListRequirement {
    private val repository = ReviewRepository()
    suspend operator fun invoke(UUID: String): UserReviewObject? =
        repository.getUserReviews(UUID)
}
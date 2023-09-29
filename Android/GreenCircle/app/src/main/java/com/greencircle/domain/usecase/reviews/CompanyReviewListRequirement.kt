package com.greencircle.domain.usecase.reviews

import com.greencircle.data.repository.ReviewRepository
import com.greencircle.domain.model.reviews.CompanyReviewObject
import java.util.UUID

class CompanyReviewListRequirement {
    private val repository = ReviewRepository()
    suspend operator fun invoke(authToken: String, companyId: UUID): CompanyReviewObject? =
        repository.getCompanyReviews(authToken, companyId)
}
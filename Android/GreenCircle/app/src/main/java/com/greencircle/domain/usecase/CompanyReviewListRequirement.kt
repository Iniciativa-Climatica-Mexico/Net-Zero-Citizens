package com.greencircle.domain.usecase

import com.greencircle.data.repository.ReviewRepository
import com.greencircle.domain.model.CompanyReviewObject
import java.util.UUID

class CompanyReviewListRequirement {
    private val repository = ReviewRepository()
    suspend operator fun invoke(companyId: UUID): CompanyReviewObject? =
        repository.getCompanyReviews(companyId)
}
package com.greencircle.domain.usecase

import com.greencircle.data.repository.ReviewRepository
import com.greencircle.domain.model.CompanyReviewObject

class CompanyReviewListRequirement {
    private val repository = ReviewRepository()
    suspend operator fun invoke(companyId: String): CompanyReviewObject? =
        repository.getCompanyReviews(companyId)
}
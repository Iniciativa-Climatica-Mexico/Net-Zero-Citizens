package com.greencircle.framework.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.greencircle.domain.model.ReviewBase
import com.greencircle.domain.usecase.AddReviewRequirement
import kotlinx.coroutines.launch

class ReviewFormViewModel : ViewModel() {
    private val addReviewRequirement = AddReviewRequirement()

    fun addReview(UUID: String, companyId: String, review: ReviewBase) {
        viewModelScope.launch {
            val response = addReviewRequirement(UUID, companyId, review)
        }
    }
}
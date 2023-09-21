package com.greencircle.framework.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.greencircle.domain.model.ReviewBase
import com.greencircle.domain.usecase.UpdateReviewRequirement
import java.util.UUID
import kotlinx.coroutines.launch

class UpdateReviewViewModel : ViewModel() {
    private val updateReviewRequirement = UpdateReviewRequirement()

    fun updateReview(reviewId: UUID, review: ReviewBase) {
        viewModelScope.launch {
            val response = updateReviewRequirement(reviewId, review)
        }
    }
}
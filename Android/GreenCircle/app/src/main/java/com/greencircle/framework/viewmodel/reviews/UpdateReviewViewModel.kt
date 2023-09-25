package com.greencircle.framework.viewmodel.reviews

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.greencircle.domain.model.reviews.ReviewBase
import com.greencircle.domain.usecase.reviews.UpdateReviewRequirement
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
package com.greencircle.framework.viewmodel.reviews

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.greencircle.domain.usecase.reviews.DeleteReviewRequirement
import java.util.UUID
import kotlinx.coroutines.launch

class DeleteUserReviewViewModel : ViewModel() {
    private val deleteReviewRequirement = DeleteReviewRequirement()
    fun deleteReview(reviewId: UUID) {
        viewModelScope.launch {
            val response = deleteReviewRequirement(reviewId)
        }
    }
}
package com.greencircle.framework.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.greencircle.domain.usecase.DeleteReviewRequirement
import kotlinx.coroutines.launch

class DeleteUserReviewViewModel : ViewModel() {
    private val deleteReviewRequirement = DeleteReviewRequirement()
    fun deleteReview(reviewId: String) {
        viewModelScope.launch {
            val response = deleteReviewRequirement(reviewId)
        }
    }
}
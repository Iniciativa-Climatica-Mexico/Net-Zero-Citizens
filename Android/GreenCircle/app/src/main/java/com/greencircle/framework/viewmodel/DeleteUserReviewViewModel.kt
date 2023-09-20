package com.greencircle.framework.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.greencircle.domain.usecase.DeleteReviewRequirement
import java.util.UUID
import kotlinx.coroutines.launch
import java.util.UUID


class DeleteUserReviewViewModel : ViewModel() {
    private val deleteReviewRequirement = DeleteReviewRequirement()
    fun deleteReview(reviewId: UUID) {
        viewModelScope.launch {
            val response = deleteReviewRequirement(reviewId)
        }
    }
}
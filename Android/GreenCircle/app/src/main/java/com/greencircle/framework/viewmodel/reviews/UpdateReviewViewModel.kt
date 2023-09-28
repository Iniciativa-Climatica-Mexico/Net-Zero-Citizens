package com.greencircle.framework.viewmodel.reviews

import android.content.Context
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.greencircle.domain.model.reviews.ReviewBase
import com.greencircle.domain.usecase.auth.RecoverTokensRequirement
import com.greencircle.domain.usecase.reviews.UpdateReviewRequirement
import java.util.UUID
import kotlinx.coroutines.launch

class UpdateReviewViewModel(private val context: Context) : ViewModel() {
    private val updateReviewRequirement = UpdateReviewRequirement()
    private val recoverTokens = RecoverTokensRequirement(context)

    fun updateReview(reviewId: UUID, review: ReviewBase) {
        viewModelScope.launch {
            val tokens = recoverTokens() ?: return@launch
            val authToken = tokens.authToken
            val response = updateReviewRequirement(authToken, reviewId, review)
        }
    }
}
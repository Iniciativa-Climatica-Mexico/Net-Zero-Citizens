package com.greencircle.framework.viewmodel.reviews

import android.content.Context
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.greencircle.domain.usecase.auth.RecoverTokensRequirement
import com.greencircle.domain.usecase.reviews.DeleteReviewRequirement
import java.util.UUID
import kotlinx.coroutines.launch

class DeleteUserReviewViewModel(private val context: Context) : ViewModel() {
    private val deleteReviewRequirement = DeleteReviewRequirement()
    private val recoverTokens = RecoverTokensRequirement(context)
    fun deleteReview(reviewId: UUID) {
        viewModelScope.launch {
            val tokens = recoverTokens() ?: return@launch
            val authToken = tokens.authToken
            val response = deleteReviewRequirement(authToken, reviewId)
        }
    }
}
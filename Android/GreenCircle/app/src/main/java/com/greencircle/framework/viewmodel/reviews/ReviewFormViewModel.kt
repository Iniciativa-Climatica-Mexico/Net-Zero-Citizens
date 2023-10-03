package com.greencircle.framework.viewmodel.reviews

import android.content.Context
import android.util.Log
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.greencircle.domain.model.reviews.ReviewBase
import com.greencircle.domain.usecase.auth.RecoverTokensRequirement
import com.greencircle.domain.usecase.reviews.AddReviewRequirement
import java.util.UUID
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class ReviewFormViewModel(private val context: Context) : ViewModel() {
    private val addReviewRequirement = AddReviewRequirement()
    private val recoverTokens = RecoverTokensRequirement(context)

    fun addReview(userId: UUID, companyId: UUID, review: ReviewBase) {
        viewModelScope.launch(Dispatchers.IO) {
            val tokens = recoverTokens() ?: return@launch
            val authToken = tokens.authToken
            try {
                addReviewRequirement(authToken, userId, companyId, review)
            } catch (e: Exception) {
                Log.d("customErrAdd", e.toString())
            }
        }
    }
}
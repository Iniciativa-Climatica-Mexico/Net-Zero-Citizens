package com.greencircle.framework.viewmodel

import android.util.Log
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.greencircle.domain.model.ReviewBase
import com.greencircle.domain.usecase.AddReviewRequirement
import java.util.UUID
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import java.util.UUID

class ReviewFormViewModel : ViewModel() {
    private val addReviewRequirement = AddReviewRequirement()

    fun addReview(userId: UUID, companyId: UUID, review: ReviewBase) {
        viewModelScope.launch(Dispatchers.IO) {
            try {
                addReviewRequirement(userId, companyId, review)
            } catch (e: Exception) {
                Log.d("customErrAdd", e.toString())
            }
        }
    }
}
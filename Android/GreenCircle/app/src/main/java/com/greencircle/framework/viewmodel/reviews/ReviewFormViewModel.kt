package com.greencircle.framework.viewmodel.reviews

import android.util.Log
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.greencircle.domain.model.reviews.ReviewBase
import com.greencircle.domain.usecase.reviews.AddReviewRequirement
import java.util.UUID
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

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
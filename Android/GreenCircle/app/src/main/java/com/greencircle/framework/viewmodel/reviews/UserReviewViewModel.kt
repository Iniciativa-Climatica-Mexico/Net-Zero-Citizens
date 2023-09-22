package com.greencircle.framework.viewmodel.reviews

import android.util.Log
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.greencircle.domain.model.reviews.UserReviewObject
import com.greencircle.domain.usecase.reviews.UserReviewListRequirement
import java.util.UUID
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class UserReviewViewModel : ViewModel() {
    val userReviewObjectLiveData = MutableLiveData<UserReviewObject?>()
    private val userReviewListRequirement = UserReviewListRequirement()

    private var userId: UUID = UUID.randomUUID()

    fun setUserId(userId: UUID) {
        this.userId = userId
    }

    fun getUserReviewsList() {
        viewModelScope.launch(Dispatchers.IO) {
            val result: UserReviewObject? = userReviewListRequirement(userId)
            if (result == null) {
                Log.d("Salida", "result is null")
            } else {
                CoroutineScope(Dispatchers.Main).launch {
                    userReviewObjectLiveData.postValue(result)
                }
            }
        }
    }
}
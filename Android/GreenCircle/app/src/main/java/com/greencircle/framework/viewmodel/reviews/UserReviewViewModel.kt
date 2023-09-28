package com.greencircle.framework.viewmodel.reviews

import android.content.Context
import android.util.Log
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.greencircle.domain.model.reviews.UserReviewObject
import com.greencircle.domain.usecase.auth.RecoverTokensRequirement
import com.greencircle.domain.usecase.reviews.UserReviewListRequirement
import java.util.UUID
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class UserReviewViewModel(private val context: Context) : ViewModel() {
    val userReviewObjectLiveData = MutableLiveData<UserReviewObject?>()
    private val userReviewListRequirement = UserReviewListRequirement()
    private val recoverTokens = RecoverTokensRequirement(context)

    private var userId: UUID = UUID.randomUUID()

    fun setUserId(userId: UUID) {
        this.userId = userId
    }

    fun getUserReviewsList() {
        viewModelScope.launch(Dispatchers.IO) {
            val tokens = recoverTokens()
            if (tokens == null) CoroutineScope(Dispatchers.Main).launch {
                userReviewObjectLiveData.postValue(null)
            } else {
                val authToken = tokens.authToken
                val result: UserReviewObject? = userReviewListRequirement(authToken, userId)
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
}
package com.greencircle.framework.viewmodel

import android.util.Log
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.greencircle.domain.model.UserReviewObject
import com.greencircle.domain.usecase.UserReviewListRequirement
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class UserReviewViewModel : ViewModel() {
    val userReviewObjectLiveData = MutableLiveData<UserReviewObject>()
    private val userReviewListRequirement = UserReviewListRequirement()

    private lateinit var UUID: String

    fun setUUID(UUID: String) {
        this.UUID = UUID
    }

    fun getUserReviewsList() {
        viewModelScope.launch(Dispatchers.IO) {
            val result: UserReviewObject? = userReviewListRequirement(UUID)
            if (result == null) {
                Log.d("Salida", "result is null")
            } else {
                CoroutineScope(Dispatchers.Main).launch {
                    userReviewObjectLiveData.postValue(result!!)
                }
            }
        }
    }
}
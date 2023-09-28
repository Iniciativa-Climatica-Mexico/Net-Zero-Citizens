package com.greencircle.framework.viewmodel.profile

import android.content.Context
import android.util.Log
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.greencircle.domain.model.profile.Profile
import com.greencircle.domain.usecase.auth.RecoverTokensRequirement
import com.greencircle.domain.usecase.profile.EditProfileRequirement
import com.greencircle.domain.usecase.profile.ProfileListRequirement
import java.util.UUID
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class ProfileViewModel(private val context: Context) : ViewModel() {
    val userLiveData = MutableLiveData<Profile>()
    private val userListRequirement = ProfileListRequirement()
    private val editUserRequirement = EditProfileRequirement()
    private val recoverTokens = RecoverTokensRequirement(context)
    private lateinit var userId: UUID
    fun setUserId(userId: UUID) {
        this.userId = userId
    }

    fun getUserProfile() {
        viewModelScope.launch(Dispatchers.IO) {
            val tokens = recoverTokens() ?: return@launch
            val authToken = tokens.authToken
            val result: Profile? = userListRequirement(authToken, userId)
            if (result == null) {
                Log.d("SalidaGetUser", "result is null")
            } else {
                CoroutineScope(Dispatchers.Main).launch {
                    userLiveData.postValue(result!!)
                }
            }
        }
    }

    fun updateUser(user: Profile) {
        viewModelScope.launch(Dispatchers.IO) {
            val tokens = recoverTokens() ?: return@launch
            val authToken = tokens.authToken
            val response = editUserRequirement(authToken, userId, user)
        }
    }
}
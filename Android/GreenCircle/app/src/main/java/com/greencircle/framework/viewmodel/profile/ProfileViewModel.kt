package com.greencircle.framework.viewmodel.profile

import android.util.Log
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.greencircle.domain.model.profile.Profile
import com.greencircle.domain.usecase.profile.EditProfileRequirement
import com.greencircle.domain.usecase.profile.ProfileListRequirement
import java.util.UUID
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class ProfileViewModel : ViewModel() {
    val userLiveData = MutableLiveData<Profile>()
    private val userListRequirement = ProfileListRequirement()
    private val editUserRequirement = EditProfileRequirement()
    private lateinit var userId: UUID
    fun setUserId(userId: UUID) {
        this.userId = userId
    }
    fun getUserProfile() {
        Log.d("SalidaGetUser", userId.toString())
        viewModelScope.launch(Dispatchers.IO) {
            val result: Profile? = userListRequirement(userId)
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
            val response = editUserRequirement(userId, user)
        }
    }
}
package com.greencircle.framework.viewmodel

import android.util.Log
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.greencircle.domain.model.User
import com.greencircle.domain.usecase.EditUserRequirement
import com.greencircle.domain.usecase.UserListRequirement
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class UserViewModel : ViewModel() {
    val userLiveData = MutableLiveData<User>()
    private val userListRequirement = UserListRequirement()
    private val editUserRequirement = EditUserRequirement()
    private lateinit var userId: String
    fun setUserId(userId: String) {
        this.userId = userId
    }
    fun getUser() {
        viewModelScope.launch(Dispatchers.IO) {
            val result: User? = userListRequirement(userId)
            if (result == null) {
                Log.d("Salida", "result is null")
            } else {
                CoroutineScope(Dispatchers.Main).launch {
                    userLiveData.postValue(result!!)
                }
            }
        }
    }

    fun updateUser(user: User){
        viewModelScope.launch(Dispatchers.IO){
            val response = editUserRequirement(userId, user)
        }
    }
}
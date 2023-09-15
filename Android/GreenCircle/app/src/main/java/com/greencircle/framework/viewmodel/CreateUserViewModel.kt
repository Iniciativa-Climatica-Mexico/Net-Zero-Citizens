package com.greencircle.framework.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.greencircle.data.remote.models.AuthResponse
import com.greencircle.domain.usecase.GoogleAuthRequirement
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class CreateUserViewModel : ViewModel() {
    private val googleAuthRequirement = GoogleAuthRequirement()

    fun googleLogin(token: String) {
        viewModelScope.launch(Dispatchers.IO) {
            val result: AuthResponse? = googleAuthRequirement(token)
        }
    }
}
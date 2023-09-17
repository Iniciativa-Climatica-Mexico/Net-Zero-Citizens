package com.greencircle.framework.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.greencircle.data.remote.models.AuthResponse
import com.greencircle.domain.usecase.LoginRequirement
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class LoginViewModel : ViewModel() {
    private val LoginRequirement = LoginRequirement()
    fun googleLogin(token: String) {
        viewModelScope.launch(Dispatchers.IO) {
            val result: AuthResponse? = LoginRequirement(token)
        //mande a un nuevo requirement que yo creo para guardar tokens y este view model lo mando
        }
    }
}
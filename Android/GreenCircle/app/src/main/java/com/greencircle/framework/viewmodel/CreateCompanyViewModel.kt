package com.greencircle.framework.viewmodel

import android.util.Log
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.greencircle.domain.usecase.GoogleAuthRequirement
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class AuthViewModel: ViewModel() {

    private val googleAuthRequirement = GoogleAuthRequirement()

    fun googleLogin() {
        viewModelScope.launch(Dispatchers.IO) {
            val result: String? = googleAuthRequirement()
            Log.d("Salida", result.toString())
        }
    }
}
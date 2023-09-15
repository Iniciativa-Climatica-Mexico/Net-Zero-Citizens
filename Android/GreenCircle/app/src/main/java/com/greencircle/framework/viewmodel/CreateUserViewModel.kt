package com.greencircle.framework.viewmodel

import android.util.Log
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.greencircle.domain.usecase.GoogleAuthRequirement
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class CreateUserViewModel : ViewModel() {

    private val googleAuthRequirement = GoogleAuthRequirement()

    fun googleLogin(token: String) {
        viewModelScope.launch(Dispatchers.IO) {
            val result: String? = googleAuthRequirement(token)
            Log.d("Salida", "Calling googleLogin()")
            Log.d("Salida", result.toString())
        }
    }
}
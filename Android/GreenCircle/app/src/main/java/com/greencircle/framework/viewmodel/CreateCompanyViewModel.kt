package com.greencircle.framework.viewmodel

import android.util.Log
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.greencircle.data.remote.models.AuthResponse
import com.greencircle.domain.usecase.GoogleAuthRequirement
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class CreateCompanyViewModel : ViewModel() {

    private val googleAuthRequirement = GoogleAuthRequirement()

    fun googleLogin(token: String) {
        viewModelScope.launch(Dispatchers.IO) {
            val result: AuthResponse? = googleAuthRequirement(token)
            Log.d("Salida", "Calling googleLogin()")
            Log.d("Salida", "Token sent to backend: $token")
            Log.d("Salida", result.toString())
        }
    }
}
package com.greencircle.framework.viewmodel

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.greencircle.data.remote.models.AuthResponse
import com.greencircle.domain.usecase.GoogleAuthRequirement
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class CreateCompanyViewModel : ViewModel() {
    private val googleAuthRequirement = GoogleAuthRequirement()
    private val _googleLoginResult = MutableLiveData<AuthResponse?>()
    val googleLoginResult: LiveData<AuthResponse?> = _googleLoginResult

    fun googleLogin(token: String) {
        viewModelScope.launch(Dispatchers.IO) {
            val result: AuthResponse? = googleAuthRequirement(token)
            _googleLoginResult.postValue(result)
        }
    }
}
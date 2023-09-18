package com.greencircle.framework.viewmodel

import android.content.Context
import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.greencircle.data.remote.models.AuthResponse
import com.greencircle.data.repository.TokenRepository
import com.greencircle.domain.usecase.GoogleAuthRequirement
import com.greencircle.domain.usecase.RecoverTokensRequirement
import com.greencircle.domain.usecase.SaveTokensRequirement
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class LoginViewModel(private val context: Context) : ViewModel() {
    private val googleAuthRequirement = GoogleAuthRequirement()
    private val saveTokensRequirement = SaveTokensRequirement(context)
    private val recoverTokensRequirement = RecoverTokensRequirement(context)
    private val _googleLoginResult = MutableLiveData<AuthResponse?>() //variable de datos dinamicos
    val googleLoginResult: LiveData<AuthResponse?> = _googleLoginResult
    fun googleLogin(token: String) {
        viewModelScope.launch(Dispatchers.IO) {
            val result: AuthResponse? = googleAuthRequirement(token)
            // mande a un nuevo requirement que yo creo para guardar tokens y este view model lo mando
            _googleLoginResult.postValue(result)
            val authToken = result?.tokens?.authToken
            val refreshToken = result?.tokens?.refreshToken
            saveTokensRequirement(authToken!!, refreshToken!!)
            val tokens: TokenRepository.Tokens? = recoverTokensRequirement()
            Log.d("Tokens", tokens.toString())
        }
    }
}
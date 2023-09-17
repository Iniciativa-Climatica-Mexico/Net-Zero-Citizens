package com.greencircle.data.repository

import android.content.SharedPreferences

class TokenRepository (private val SharedPreferences: SharedPreferences){
    private val authTokenKey = "token" //tiene que llegar ell token del usuario
    private val refreshTokenKey = "refreshToken"

    fun saveTokens(authToken: String, refreshToken: String){
        val editor = SharedPreferences.edit()
        editor.putString(authTokenKey, authToken)
        editor.putString(refreshTokenKey, refreshToken)
        editor.apply()
    }

    fun getAuthToken(): String? {
        return SharedPreferences.getString(authTokenKey, null)
    }

    fun getRefreshToken(): String? {
        return SharedPreferences.getString(refreshTokenKey, null)
    }

}
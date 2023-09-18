package com.greencircle.data.repository

import android.content.SharedPreferences

class TokenRepository(private val sharedPreferences: SharedPreferences) {
    private val authTokenKey: String = "auth_token"
    private val refreshTokenKey: String = "refresh_token"

    data class Tokens(val authToken: String, val refreshToken: String)

    fun saveTokens(authToken: String, refreshToken: String) {
        val editor = sharedPreferences.edit()
        editor.putString(authTokenKey, authToken)
        editor.putString(refreshTokenKey, refreshToken)
        editor.apply()
    }

    fun recoverTokens(): Tokens? {
        val authToken = sharedPreferences.getString(authTokenKey, null)
        val refreshToken = sharedPreferences.getString(refreshTokenKey, null)
        return if (authToken != null && refreshToken != null) {
            Tokens(authToken, refreshToken)
        } else {
            null
        }
    }
}
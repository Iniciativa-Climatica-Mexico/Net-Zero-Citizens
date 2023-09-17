package com.greencircle.data.repository

import com.greencircle.data.remote.AuthAPIClient
import com.greencircle.data.remote.models.AuthResponse

class AuthRepository {
    private val apiGoogleAuth = AuthAPIClient()
    suspend fun googleLogin(token: String): AuthResponse? = apiGoogleAuth.googleLogin(token)
}
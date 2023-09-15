package com.greencircle.data.repository

import com.greencircle.data.remote.AuthAPIClient
import com.greencircle.data.remote.models.AuthResponse

class AuthRepository {
    private val apiCompany = AuthAPIClient()

    suspend fun googleLogin(token: String): AuthResponse? = apiCompany.googleLogin(token)
}
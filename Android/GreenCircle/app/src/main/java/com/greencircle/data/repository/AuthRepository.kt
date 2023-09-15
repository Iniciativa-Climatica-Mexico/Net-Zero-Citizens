package com.greencircle.data.repository

import com.greencircle.data.remote.AuthAPIClient

class AuthRepository {
    private val apiCompany = AuthAPIClient()

    suspend fun googleLogin(token: String): String? = apiCompany.googleLogin(token)
}
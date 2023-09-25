package com.greencircle.data.remote.auth

import android.util.Log
import com.greencircle.domain.model.auth.AuthResponse

/**
 * Cliente para realizar operaciones relacionadas con el AuthService de Google.
 */
class AuthAPIClient {
    private lateinit var api: AuthAPIService

    class AuthAPIClient()

    suspend fun googleLogin(token: String): AuthResponse? {
        api = AuthNetworkModel()
        return try {
            Log.d("AuthAPIClient", "Token: $token")
            val body = AuthAPIService.GoogleLoginRequest(token)
            val response = api.googleLogin(body)
            Log.d("AuthAPIClient", "Response: $response")
            response
        } catch (e: Exception) {
            e.printStackTrace()
            Log.e("AuthAPIClient", "Error: $e")
            null
        }
    }
}
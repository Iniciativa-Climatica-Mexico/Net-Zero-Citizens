package com.greencircle.data.remote

import android.util.Log
import com.greencircle.data.remote.models.AuthResponse

class AuthAPIClient {
    private lateinit var api: AuthAPIService

    class AuthAPIClient()

    suspend fun googleLogin(token: String): AuthResponse? {
        api = AuthNetworkModel()
        return try {
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
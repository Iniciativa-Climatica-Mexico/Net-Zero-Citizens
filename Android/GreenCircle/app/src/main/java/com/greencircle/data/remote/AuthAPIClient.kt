package com.greencircle.data.remote

import android.util.Log
import com.greencircle.data.remote.models.AuthResponse

class AuthAPIClient {
    private lateinit var api: AuthAPIService

    class AuthAPIClient()

    suspend fun googleLogin(token: String): AuthResponse? {
        api = AuthNetworkModel()
        Log.d("AuthAPIClient", "Fetching data from API")
        return try {
            val body = AuthAPIService.GoogleLoginRequest(token)
            val response = api.googleLogin(body)
            Log.d("AuthAPIClient", "Res: $response")
            Log.d("AuthAPIClient", "User: ${response.user.firstName}")
            Log.d("AuthAPIClient", "Email: ${response.user.email}")
            Log.d("AuthAPIClient", "Token: ${response.tokens.authToken}")
            response // Extract the message from the response
        } catch (e: Exception) {
            e.printStackTrace()
            Log.e("AuthAPIClient", "Error: $e")
            null
        }
    }
}
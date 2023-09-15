package com.greencircle.data.remote

import android.util.Log

class AuthAPIClient {
    private lateinit var api: AuthAPIService

    class AuthAPIClient()

    suspend fun googleLogin(token: String): String? {
        api = AuthNetworkModel()
        Log.d("AuthAPIClient", "Fetching data from API")
        return try {
            val body = AuthAPIService.GoogleLoginRequest(token)
            val response = api.googleLogin(body)
            Log.d("AuthAPIClient", "Response: ${response.authToken}")
            Log.d("AuthAPIClient", "Response: ${response.refreshToken}")
            Log.d("AuthAPIClient", "Response: ${response.error}")
            response.authToken // Extract the message from the response
        } catch (e: Exception) {
            e.printStackTrace()
            Log.e("AuthAPIClient", "Error: $e")
            null
        }
    }
}
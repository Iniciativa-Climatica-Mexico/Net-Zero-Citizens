package com.greencircle.data.remote

import android.util.Log

class AuthAPIClient {
    private lateinit var api: AuthAPIService

    class AuthAPIClient()

    suspend fun googleLogin(): String? {
        api = AuthNetworkModel()
        return try {
            val response = api.googleLogin()
            Log.d("AuthAPIClient", "Response: $response")
            response.message // Extract the message from the response
        } catch (e: Exception) {
            e.printStackTrace()
            Log.e("AuthAPIClient", "Error: ${e.message}")
            null
        }
    }
}
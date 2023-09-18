package com.greencircle.data.remote

import android.util.Log

class UserAPIClient {
    private lateinit var api: UserAPIService

    suspend fun updateUser(
        userId: String,
        userInfo: UserAPIService.UpdateUserRequest
    ): UserAPIService.UpdateUserResponse? {
        api = UserNetworkModel()
        return try {
            val response = api.updateUser(userId, userInfo)
            response
        } catch (e: Exception) {
            e.printStackTrace()
            Log.e("UpdateUser", "Error: $e")
            null
        }
    }
}

package com.greencircle.data.repository

import com.greencircle.data.remote.UserAPIClient
import com.greencircle.data.remote.UserAPIService

class UserRepository {
    private val apiUser = UserAPIClient()
    suspend fun updateUser(
        userId: String,
        userInfo: UserAPIService.UpdateUserRequest
    ): UserAPIService.UpdateUserResponse? =
        apiUser.updateUser(userId,userInfo)
}
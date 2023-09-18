package com.greencircle.domain.model

import com.greencircle.data.remote.UserAPIService
import com.greencircle.data.repository.UserRepository

class UpdateUserRequirement {
    private val repository = UserRepository()
    suspend operator fun invoke(
        userId: String,
        userInfo: UserAPIService.UpdateUserRequest
    ): UserAPIService.UpdateUserResponse? =
        repository.updateUser(userId, userInfo)
}
package com.greencircle.domain.usecase

import com.greencircle.data.repository.UserRepository
import com.greencircle.domain.model.User

class EditUserRequirement {
    private val repository = UserRepository()

    suspend operator fun invoke(userId: String, user: User): User? =
        repository.updateUser(userId, user)
}
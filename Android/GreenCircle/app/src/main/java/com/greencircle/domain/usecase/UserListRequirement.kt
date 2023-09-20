package com.greencircle.domain.usecase
import com.greencircle.data.repository.UserRepository
import com.greencircle.domain.model.User

class UserListRequirement {
    private val repository = UserRepository()
    suspend operator fun invoke(userId: String): User? = repository.getUser(userId)
}
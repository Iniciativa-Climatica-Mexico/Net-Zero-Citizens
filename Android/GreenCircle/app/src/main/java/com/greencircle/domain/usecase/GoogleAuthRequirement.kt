package com.greencircle.domain.usecase

import com.greencircle.data.remote.models.AuthResponse
import com.greencircle.data.repository.AuthRepository

class GoogleAuthRequirement {
    private val repository = AuthRepository()

    suspend operator fun invoke(token: String): AuthResponse? = repository.googleLogin(token)
}
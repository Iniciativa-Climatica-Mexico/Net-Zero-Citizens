package com.greencircle.domain.usecase

import com.greencircle.data.repository.AuthRepository

class GoogleAuthRequirement {
    private val repository = AuthRepository()

    suspend operator fun invoke(token: String): String? = repository.googleLogin(token)
}
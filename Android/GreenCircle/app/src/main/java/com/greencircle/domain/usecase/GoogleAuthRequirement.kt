package com.greencircle.domain.usecase

import com.greencircle.data.repository.AuthRepository

class GoogleAuthRequirement {
    private val repository = AuthRepository()

    suspend operator fun invoke(): String? = repository.googleLogin()
}
package com.greencircle.domain.usecase


import com.greencircle.data.remote.models.AuthResponse
import com.greencircle.data.repository.TokenRepository

class TokenRequirement {
    private val repository = TokenRepository()

    suspend operator fun invoke(token: String): Unit = repository.saveTokens(token, token)
}
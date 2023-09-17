package com.greencircle.domain.usecase

import com.greencircle.data.remote.models.AuthResponse
import com.greencircle.data.repository.LoginRepository


class LoginRequirement {
    private val repository = LoginRepository()
    suspend operator fun invoke(token: String): AuthResponse? = repository.googleLogin(token) //cambiar
}
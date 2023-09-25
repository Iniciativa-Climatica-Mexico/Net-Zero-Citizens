package com.greencircle.domain.model.auth
import com.greencircle.domain.model.user.User

data class AuthResponse(
    val tokens: Tokens,
    val user: User,
    val error: String?
)
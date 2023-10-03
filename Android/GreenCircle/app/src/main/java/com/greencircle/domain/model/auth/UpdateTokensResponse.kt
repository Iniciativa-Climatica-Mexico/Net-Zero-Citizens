package com.greencircle.domain.model.auth

data class UpdateTokensResponse(
    val authToken: String?,
    val refreshToken: String?,
    val error: String?
)

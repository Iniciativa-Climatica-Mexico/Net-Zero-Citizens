package com.greencircle.data.remote.models

import com.google.gson.annotations.SerializedName
import java.util.UUID

data class AuthResponse(
    val tokens: Tokens,
    val user: User,
    val error: String?
)

data class Tokens(
    @SerializedName("authToken") val authToken: String,
    @SerializedName("refreshToken") val refreshToken: String
)

data class User(
    @SerializedName("first_name") val firstName: String,
    @SerializedName("last_name") val lastName: String,
    @SerializedName("uuid") val uuid: UUID,
    @SerializedName("email") val email: String,
    @SerializedName("picture") val picture: String,
    @SerializedName("roles") val roles: String,
    @SerializedName("login_type") val loginType: String
)

package com.greencircle.domain.model.auth

import com.google.gson.annotations.SerializedName

data class Tokens(
    @SerializedName("authToken") val authToken: String,
    @SerializedName("refreshToken") val refreshToken: String
)

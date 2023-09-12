package com.greencircle.domain.model

import com.google.gson.annotations.SerializedName

data class UserBase(
    @SerializedName("firstName") val firstName: String,
    @SerializedName("lastName") val lastName: String,
)

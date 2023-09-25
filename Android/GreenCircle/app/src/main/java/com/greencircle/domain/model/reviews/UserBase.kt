package com.greencircle.domain.model.reviews

import com.google.gson.annotations.SerializedName

data class UserBase(
    @SerializedName("firstName") val firstName: String,
    @SerializedName("lastName") val lastName: String,
)

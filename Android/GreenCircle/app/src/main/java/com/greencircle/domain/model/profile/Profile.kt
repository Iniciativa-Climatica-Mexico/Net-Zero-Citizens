package com.greencircle.domain.model.profile

import com.google.gson.annotations.SerializedName
import java.util.UUID

data class Profile(
    @SerializedName("userId") val userId: UUID,
    @SerializedName("firstName") val firstName: String,
    @SerializedName("lastName") val lastName: String,
    @SerializedName("secondLastName") val secondLastName: String,
    @SerializedName("email") val email: String,
    @SerializedName("password") val password: String,
    @SerializedName("phoneNumber") val phoneNumber: String,
    @SerializedName("age") val age: Int,
    @SerializedName("state") val state: String,
    @SerializedName("gender") var gender: String,
    @SerializedName("profilePicture") val profilePicture: String?,
    @SerializedName("createdAt") val createdAt: String,
    @SerializedName("updatedAt") val updatedAt: String
)
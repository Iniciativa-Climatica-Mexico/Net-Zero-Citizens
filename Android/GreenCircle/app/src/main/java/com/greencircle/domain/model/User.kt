package com.greencircle.domain.model

import com.google.gson.annotations.SerializedName

data class User(
    @SerializedName("userId") val userId: String,
    @SerializedName("roleId") val roleId: Int,
    @SerializedName("companyId") val companyId: String,
    @SerializedName("googleId") val googleId: Int,
    @SerializedName("facebookId") val facebookId: Int,
    @SerializedName("appleId") val appleId: Int,
    @SerializedName("firstName") val firstName: String,
    @SerializedName("lastName") val lastName: String,
    @SerializedName("secondLastName") val secondLastName: String,
    @SerializedName("email") val email: String,
    @SerializedName("password") val password: String,
    @SerializedName("phoneNumber") val phoneNumber: String,
    @SerializedName("age") val age: Int,
    @SerializedName("state") val state: String,
    @SerializedName("sex") val sex: String,
    @SerializedName("profilePicture") val profilePicture: String,
    @SerializedName("createdAt") val createdAt: String,
    @SerializedName("updatedAt") val updatedAt: String
)
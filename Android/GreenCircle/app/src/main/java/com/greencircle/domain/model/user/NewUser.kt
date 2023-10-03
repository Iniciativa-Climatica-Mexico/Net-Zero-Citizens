package com.greencircle.domain.model.user

import com.google.gson.annotations.SerializedName
import java.util.UUID

data class NewUser(
    val firstName: String,
    val lastName: String,
    val secondLastName: String,
    val email: String,
    val password: String,
    val roleId: String,
    val phoneNumber: String,
    val age: Int,
    val gender: String,
    val state: String,
    val profilePicture: String,
)
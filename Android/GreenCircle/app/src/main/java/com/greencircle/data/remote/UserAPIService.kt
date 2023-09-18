package com.greencircle.data.remote

import retrofit2.http.Body
import retrofit2.http.PUT
import retrofit2.http.Path

interface UserAPIService {
    data class UpdateUserResponse(
        val userId: String?,
        val message: String?
    )

    data class UpdateUserRequest(
        val phoneNumber: String,
        val age: String,
        val state: String,
        val gender: String,

    )

    @PUT("users/{userId}")
    suspend fun updateUser(
        @Path("userId") userId: String,
        @Body request: UpdateUserRequest
    ): UpdateUserResponse
}
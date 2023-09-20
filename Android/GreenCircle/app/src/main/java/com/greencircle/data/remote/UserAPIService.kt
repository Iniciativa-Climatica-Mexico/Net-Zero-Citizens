package com.greencircle.data.remote

import com.greencircle.domain.model.User
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.PUT
import retrofit2.http.Path

interface UserAPIService {
    @GET("users/{userId}")
    suspend fun getUser(
        @Path("userId") userId: String
    ): User

    @PUT("users/{userId}")
    suspend fun updateUser(
        @Path("userId") userId: String,
        @Body user: User
    ): User
}
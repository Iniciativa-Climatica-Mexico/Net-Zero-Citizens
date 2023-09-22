package com.greencircle.data.remote.profile

import com.greencircle.domain.model.profile.Profile
import java.util.UUID
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.PUT
import retrofit2.http.Path

interface ProfileAPIService {
    @GET("users/{userId}")
    suspend fun getUser(
        @Path("userId") userId: UUID
    ): Profile

    @PUT("users/{userId}")
    suspend fun updateUser(
        @Path("userId") userId: UUID,
        @Body user: Profile
    ): Profile
}
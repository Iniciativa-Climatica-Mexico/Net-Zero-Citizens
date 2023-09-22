package com.greencircle.data.remote

import com.greencircle.data.remote.models.AuthResponse
import retrofit2.http.Body
import retrofit2.http.POST

public interface AuthAPIService {
    data class GoogleLoginRequest(val googleToken: String)

    @POST("auth/login/google")
    suspend fun googleLogin(@Body request: GoogleLoginRequest): AuthResponse
}
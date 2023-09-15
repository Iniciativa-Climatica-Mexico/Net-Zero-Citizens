package com.greencircle.data.remote

import retrofit2.http.Body
import retrofit2.http.POST

public interface AuthAPIService {
    // http:localhost:8000/api/v1/auth

    data class GoogleLoginResponse(
        val authToken: String,
        val refreshToken: String,
        val error: String
    )
    data class GoogleLoginRequest(val googleToken: String)
    @POST("auth/login/google")
    suspend fun googleLogin(@Body request: GoogleLoginRequest): GoogleLoginResponse
}

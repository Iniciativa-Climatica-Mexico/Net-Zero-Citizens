package com.greencircle.data.remote

import retrofit2.http.POST

public interface AuthAPIService {
    // http:localhost:8000/api/v1/auth

    data class GoogleLoginResponse(val message: String)
    @POST("test")
    suspend fun googleLogin(): GoogleLoginResponse
}

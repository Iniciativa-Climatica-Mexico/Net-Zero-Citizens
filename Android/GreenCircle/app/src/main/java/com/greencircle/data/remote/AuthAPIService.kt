package com.greencircle.data.remote;

import retrofit2.http.POST;

public interface AuthAPIService {
    // http:localhost:8000/api/v1/auth

    @POST("test")
    suspend fun googleLogin(): String
}

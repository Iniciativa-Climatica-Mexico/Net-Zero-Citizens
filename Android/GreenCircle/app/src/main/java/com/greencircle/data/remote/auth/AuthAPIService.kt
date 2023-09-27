package com.greencircle.data.remote.auth

import com.greencircle.domain.model.auth.AuthResponse
import retrofit2.http.Body
import retrofit2.http.POST

public interface AuthAPIService {
    data class GoogleLoginRequest(val googleToken: String)
    data class UpdateTokensRequest(val refreshToken: String)
    data class UpdateTokensDataRequest(val authToken: String)

    @POST("auth/login/google")
    suspend fun googleLogin(@Body request: GoogleLoginRequest): AuthResponse

    @POST("auth/refresh")
    suspend fun refreshTokens(@Body request: UpdateTokensRequest): AuthResponse

    @POST("auth/update/tokens/data")
    suspend fun updateTokensData(@Body request: UpdateTokensDataRequest): AuthResponse
}
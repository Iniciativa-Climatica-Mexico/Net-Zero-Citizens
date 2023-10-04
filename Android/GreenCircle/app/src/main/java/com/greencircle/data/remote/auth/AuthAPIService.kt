package com.greencircle.data.remote.auth

import com.greencircle.domain.model.auth.AuthResponse
import com.greencircle.domain.model.user.NewUser
import retrofit2.http.Body
import retrofit2.http.POST

public interface AuthAPIService {
    data class GoogleLoginRequest(val googleToken: String)
    data class UpdateTokensRequest(val refreshToken: String)
    data class UpdateTokensDataRequest(val authToken: String)
    data class LoginCredentialsRequest(val email: String, val password: String)
    data class RegisterCredentialsRequest(
        val user: NewUser
    )

    @POST("auth/login/google")
    suspend fun googleLogin(@Body request: GoogleLoginRequest): AuthResponse

    @POST("auth/refresh")
    suspend fun refreshTokens(@Body request: UpdateTokensRequest): AuthResponse

    @POST("auth/update/tokens/data")
    suspend fun updateTokensData(@Body request: UpdateTokensDataRequest): AuthResponse

    @POST("auth/login/credentials")
    suspend fun loginCredentials(@Body request: LoginCredentialsRequest): AuthResponse

    @POST("auth/register/credentials")
    suspend fun registerCredentials(@Body request: RegisterCredentialsRequest): AuthResponse
}
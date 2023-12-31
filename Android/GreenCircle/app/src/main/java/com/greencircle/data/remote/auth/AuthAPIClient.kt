package com.greencircle.data.remote.auth

import com.greencircle.domain.model.auth.AuthResponse
import com.greencircle.domain.model.user.NewUser

/**
 * Cliente para realizar operaciones relacionadas con el AuthService de Google.
 */
class AuthAPIClient {
    private lateinit var api: AuthAPIService

    suspend fun googleLogin(token: String): AuthResponse? {
        api = AuthNetworkModel()
        return try {
            val body = AuthAPIService.GoogleLoginRequest(token)
            val response = api.googleLogin(body)
            response
        } catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }

    suspend fun refreshTokens(refreshToken: String): AuthResponse? {
        api = AuthNetworkModel()
        return try {
            val body = AuthAPIService.UpdateTokensRequest(refreshToken)
            val response = api.refreshTokens(body)
            response
        } catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }

    suspend fun updateTokensData(authToken: String): AuthResponse? {
        api = AuthNetworkModel()
        return try {
            val body = AuthAPIService.UpdateTokensDataRequest(authToken)
            val response = api.updateTokensData(body)
            response
        } catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }

    suspend fun loginCredentials(email: String, password: String): AuthResponse? {
        api = AuthNetworkModel()
        return try {
            val body = AuthAPIService.LoginCredentialsRequest(email, password)
            val response = api.loginCredentials(body)
            response
        } catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }

    suspend fun registerCredentials(
        user: NewUser
    ): AuthResponse? {
        api = AuthNetworkModel()
        return try {
            val body = AuthAPIService.RegisterCredentialsRequest(user)
            val response = api.registerCredentials(body)
            response
        } catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }
}
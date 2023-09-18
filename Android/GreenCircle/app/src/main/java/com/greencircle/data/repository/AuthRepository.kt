package com.greencircle.data.repository

import com.greencircle.data.remote.AuthAPIClient
import com.greencircle.data.remote.models.AuthResponse

/**
 * Repositorio para gestionar operaciones relacionadas con la autenticación de usuarios.
 *
 * Este repositorio proporciona métodos para interactuar con la API de Auth y realizar operaciones
 * como el login de Google.
 */
class AuthRepository {
    private val apiGoogleAuth = AuthAPIClient()
    suspend fun googleLogin(token: String): AuthResponse? = apiGoogleAuth.googleLogin(token)
}
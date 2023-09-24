package com.greencircle.data.repository

import com.greencircle.data.remote.auth.AuthAPIClient
import com.greencircle.data.remote.models.AuthResponse

/**
 * Repositorio para gestionar operaciones relacionadas con la autenticación de usuarios.
 *
 * Este repositorio proporciona métodos para interactuar con la API de Auth y realizar operaciones
 * como el inicio de sesión de Google.
 */
class AuthRepository {
    private val apiGoogleAuth = AuthAPIClient()

    /**
     * Realiza el inicio de sesión con Google utilizando el token proporcionado.
     *
     * @param token El token de autenticación de Google.
     * @return Un objeto [AuthResponse] que contiene la respuesta de la autenticación, o null
     * si hay un error.
     */
    suspend fun googleLogin(token: String): AuthResponse? = apiGoogleAuth.googleLogin(token)
}
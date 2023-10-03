package com.greencircle.data.repository

import com.greencircle.data.remote.auth.AuthAPIClient
import com.greencircle.domain.model.auth.AuthResponse
import com.greencircle.domain.model.user.NewUser

/**
 * Repositorio para gestionar operaciones relacionadas con la autenticación de usuarios.
 *
 * Este repositorio proporciona métodos para interactuar con la API de Auth y realizar operaciones
 * como el inicio de sesión de Google.
 */
class AuthRepository {
    private val api = AuthAPIClient()

    /**
     * Realiza el inicio de sesión con Google utilizando el token proporcionado.
     *
     * @param token El token de autenticación de Google.
     * @return Un objeto [AuthResponse] que contiene la respuesta de la autenticación, o null
     * si hay un error.
     */
    suspend fun googleLogin(token: String): AuthResponse? = api.googleLogin(token)

    /**
     * Actualiza los tokens utilizando un refresh token.
     *
     * @param refreshToken El token de actualización.
     * @return Un objeto [UpdateTokenResponse] que contiene los nuevos tokens, o null
     * si hay un error.
     */
    suspend fun refreshTokens(refreshToken: String): AuthResponse? =
        api.refreshTokens(refreshToken)

    /**
     * Actualiza la información de los tokens utilizando un auth token.
     *
     * @param authToken El token de actualización.
     * @return Un objeto [UpdateTokensDataResponse] que contiene los nuevos tokens y usuario
     * si hay un error.
     */
    suspend fun updateTokensData(authToken: String): AuthResponse? =
        api.updateTokensData(authToken)

    /**
     * Realiza el inicio de sesión con credenciales del usuario (email y contraseña).
     *
     * @param email El email del usuario.
     * @param password La contraseña del usuario.
     * @return Un objeto [AuthResponse] que contiene la respuesta de la autenticación, o null
     * si hay un error.
     */
    suspend fun loginCredentials(email: String, password: String): AuthResponse? =
        api.loginCredentials(email, password)

    /**
     * Registra un nuevo usuario con credenciales (email, contraseña, nombre y apellidos).
     *
     * @param user [newUser] Un objeto que contiene los datos del usuario.
     * @return Un objeto [AuthResponse] que contiene la respuesta de la autenticación, o null
     * si hay un error.
     */
    suspend fun registerCredentials(user: NewUser): AuthResponse? =
        api.registerCredentials(user)
}
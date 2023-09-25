package com.greencircle.domain.usecase.auth

import com.greencircle.data.repository.AuthRepository
import com.greencircle.domain.model.auth.AuthResponse

/**
 * Caso de uso para la autenticación con Google.
 *
 * Esta clase se utiliza para realizar la autenticación de un usuario utilizando un token de Google.
 *
 * @param repository El repositorio que proporciona métodos para interactuar con la autenticación.
 */
class GoogleAuthRequirement {
    private val repository = AuthRepository()

    /**
     * Realiza la autenticación con Google utilizando el token proporcionado.
     *
     * @param token El token de autenticación de Google.
     * @return Un objeto [AuthResponse] que contiene la respuesta de la autenticación, o null
     * si hay un error.
     */
    suspend operator fun invoke(token: String): AuthResponse? = repository.googleLogin(token)
}
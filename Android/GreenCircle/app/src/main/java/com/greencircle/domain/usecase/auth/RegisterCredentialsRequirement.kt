package com.greencircle.domain.usecase.auth

import com.greencircle.data.repository.AuthRepository
import com.greencircle.domain.model.auth.AuthResponse
import com.greencircle.domain.model.user.NewUser

/**
 * Caso de uso para el registro de un usuario con credenciales.
 *
 * Esta clase se utiliza para realizar el registro de un usuario utilizando sus credenciales (email, contraseña, nombre y apellidos).
 *
 * @param repository El repositorio que proporciona métodos para interactuar con la autenticación.
 */
class RegisterCredentialsRequirement {
    private val repository = AuthRepository()

    /**
     * Registra un nuevo usuario con credenciales (email, contraseña, nombre y apellidos).
     *
     * @param user [newUser] Un objeto que contiene los datos del usuario.
     * @return Un objeto [AuthResponse] que contiene la respuesta de la autenticación, o null
     * si hay un error.
     */
    suspend operator fun invoke(user: NewUser): AuthResponse? =
        repository.registerCredentials(user)
}
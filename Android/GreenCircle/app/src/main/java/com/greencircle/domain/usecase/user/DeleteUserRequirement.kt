package com.greencircle.domain.usecase.user

import com.greencircle.data.remote.user.UserAPIService
import com.greencircle.data.repository.UserRepository
import java.util.UUID

/**
 * Modelo para eliminar un usuario.
 *
 * Este modelo proporciona un método para eliminar un usuario
 * utilizando el [UserRepository] para interactuar con la API de usuario.
 */
class DeleteUserRequirement {
    private val repository = UserRepository()

    /**
     * Elimina el usuario de la base de datos.
     * @param authToken El token del usuario.
     * @param userId El ID del usuario que se va a eliminar.
     * @return Un objeto [UserAPIService.DeleteUserResponse] que puede contener un mensaje, error y status.
     */
    suspend operator fun invoke(
        authToken: String,
        userId: UUID
    ): UserAPIService.DeleteUserResponse =
        repository.deleteUser(authToken, userId)
}
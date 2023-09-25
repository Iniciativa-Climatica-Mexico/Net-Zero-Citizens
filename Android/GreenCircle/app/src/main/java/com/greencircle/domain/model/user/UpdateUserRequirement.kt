package com.greencircle.domain.model.user

import com.greencircle.data.remote.user.UserAPIService
import com.greencircle.data.repository.UserRepository
import java.util.UUID

/**
 * Modelo para actualizar la información de un usuario.
 *
 * Este modelo proporciona un método para actualizar la información de un usuario
 * utilizando el [UserRepository] para interactuar con la API de usuario.
 */
class UpdateUserRequirement {
    private val repository = UserRepository()

    /**
     * Actualiza la información de un usuario.
     *
     * @param userId El ID del usuario que se va a actualizar.
     * @param userInfo La información actualizada del usuario.
     * @return Un objeto [UserAPIService.UpdateUserResponse] que puede contener el id del
     * nuevo usuario y un mensaje.
     */
    suspend operator fun invoke(
        userId: UUID,
        userInfo: UserAPIService.UpdateUserRequest,
        authToken: String
    ): UserAPIService.UpdateUserResponse? =
        repository.updateUser(userId, userInfo, authToken)
}
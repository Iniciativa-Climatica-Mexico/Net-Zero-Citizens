package com.greencircle.data.repository

import com.greencircle.data.remote.user.UserAPIClient
import com.greencircle.data.remote.user.UserAPIService
import com.greencircle.data.remote.user.UserAPIService.DeleteUserResponse
import java.util.UUID

/**
 * Repositorio para gestionar operaciones relacionadas con usuarios.
 *
 * Este repositorio proporciona métodos para interactuar con la API de usuario y realizar operaciones
 * como la actualización de información de usuario.
 */
class UserRepository {
    // Cliente de la API de usuario para realizar llamadas a la API.
    private val apiUser = UserAPIClient()

    /**
     * Actualiza la información de un usuario en la API.
     *
     * @param userId El ID del usuario que se va a actualizar.
     * @param userInfo La información actualizada del usuario.
     * @param authToken El token del usuario.
     * @return Un objeto [UserAPIService.UpdateUserResponse] que contiene información sobre la actualización realizada.
     */
    suspend fun updateUser(
        userId: UUID,
        userInfo: UserAPIService.UpdateUserRequest,
        authToken: String
    ): UserAPIService.UpdateUserResponse? =
        apiUser.updateUser(userId, userInfo, authToken)

    /**
     * Elimina el usuario de la base de datos.
     * @param authToken El token del usuario.
     * @param userId El ID del usuario que se va a eliminar.
     * @return Un objeto [UserAPIService.DeleteUserResponse] que puede contener un mensaje, error y status.
     */
    suspend fun deleteUser(
        authToken: String,
        userId: UUID
    ): DeleteUserResponse =
        apiUser.deleteUser(authToken, userId)
}
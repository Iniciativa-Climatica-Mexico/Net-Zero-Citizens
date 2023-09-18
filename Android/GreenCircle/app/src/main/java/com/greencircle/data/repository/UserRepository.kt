package com.greencircle.data.repository

import com.greencircle.data.remote.UserAPIClient
import com.greencircle.data.remote.UserAPIService

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
     * @return Un objeto [UserAPIService.UpdateUserResponse] que contiene información sobre la actualización realizada.
     */
    suspend fun updateUser(
        userId: String,
        userInfo: UserAPIService.UpdateUserRequest,
        authToken: String
    ): UserAPIService.UpdateUserResponse? =
        apiUser.updateUser(userId, userInfo, authToken)
}
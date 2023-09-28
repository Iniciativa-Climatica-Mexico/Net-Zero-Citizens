package com.greencircle.data.remote.user

import com.greencircle.data.remote.NetworkModel
import java.util.UUID

/**
 * Cliente para realizar operaciones relacionadas con usuarios a través de la API.
 */
class UserAPIClient {
    private lateinit var api: UserAPIService

    /**
     * Actualiza la información de un usuario en la API.
     *
     * @param userId El ID del usuario que se va a actualizar.
     * @param userInfo La información actualizada del usuario.
     * @return Un objeto [UserAPIService.UpdateUserResponse] que contiene información sobre la actualización realizada.
     */
    suspend fun updateUser(
        userId: UUID,
        userInfo: UserAPIService.UpdateUserRequest,
        authToken: String
    ): UserAPIService.UpdateUserResponse? {
        api = NetworkModel(authToken, UserAPIService::class.java)
        return try {
            val response = api.updateUser(userId, userInfo)
            response
        } catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }
}

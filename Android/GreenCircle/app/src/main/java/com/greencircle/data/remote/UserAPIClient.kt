package com.greencircle.data.remote

import android.util.Log

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
        userId: String,
        userInfo: UserAPIService.UpdateUserRequest,
        authToken: String
    ): UserAPIService.UpdateUserResponse? {
        // Inicializa el cliente de la API de usuario.
        api = UserNetworkModel(authToken)
        return try {
            // Realiza la actualización del usuario llamando al método en la API.
            val response = api.updateUser(userId, userInfo)
            response
        } catch (e: Exception) {
            // Maneja cualquier excepción que pueda ocurrir durante la actualización.
            e.printStackTrace()
            Log.e("UpdateUser", "Error: $e")
            null
        }
    }
}

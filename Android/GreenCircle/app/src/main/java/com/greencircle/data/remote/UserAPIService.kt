package com.greencircle.data.remote

import java.util.UUID
import retrofit2.http.Body
import retrofit2.http.PUT
import retrofit2.http.Path

/**
 * Interfaz que define los métodos para realizar operaciones relacionadas con usuarios a través de una API.
 */
interface UserAPIService {

    /**
     * Clase que representa la respuesta de la actualización de un usuario.
     * Nota: Esta estructura viene del backend del método updateUser en el users.controller
     *
     * @property userId El ID del usuario actualizado.
     * @property message Un mensaje informativo relacionado con la actualización.
     */
    data class UpdateUserResponse(
        val userId: String?,
        val message: String?
    )

    /**
     * Clase que representa la solicitud de actualización de usuario.
     *
     * @property phoneNumber El número de teléfono del usuario.
     * @property age La edad del usuario.
     * @property state El estado de residencia del usuario.
     * @property gender El género del usuario.
     */
    data class UpdateUserRequest(
        val phoneNumber: String,
        val age: String,
        val state: String,
        val gender: String,
        val roleId: String?

    )

    /**
     * Actualiza la información del usuario en la API.
     *
     * @param userId El ID del usuario que se va a actualizar.
     * @param request La solicitud de actualización que contiene los nuevos datos del usuario.
     * @return Un objeto [UpdateUserResponse] que puede contener el id del nuevo usuario y un mensaje.
     */
    @PUT("users/{userId}")
    suspend fun updateUser(
        @Path("userId") userId: UUID,
        @Body request: UpdateUserRequest
    ): UpdateUserResponse
}
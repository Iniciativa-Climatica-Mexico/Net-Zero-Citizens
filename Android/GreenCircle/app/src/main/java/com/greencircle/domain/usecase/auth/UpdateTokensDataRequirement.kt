package com.greencircle.domain.usecase.auth

import com.greencircle.data.repository.AuthRepository
import com.greencircle.domain.model.auth.AuthResponse

/**
 * Caso de uso para actualizar la información de los tokens.
 *
 * Esta clase se utiliza para actualizar los tokens del usuario después de actualizar la información del usuario
 */
class UpdateTokensDataRequirement {
    private val repository = AuthRepository()

    /**
     * Actualiza la información de los tokens utilizando un auth token.
     *
     * @param authToken El token de actualización.
     * @return Un objeto [UpdateTokensDataResponse] que contiene los nuevos tokens, o null
     * si hay un error.
     */
    suspend operator fun invoke(authToken: String): AuthResponse? =
        repository.updateTokensData(authToken)
}
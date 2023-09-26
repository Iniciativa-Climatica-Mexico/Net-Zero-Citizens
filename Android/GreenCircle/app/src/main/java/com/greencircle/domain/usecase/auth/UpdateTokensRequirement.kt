package com.greencircle.domain.usecase.auth

import com.greencircle.data.repository.AuthRepository
import com.greencircle.domain.model.auth.AuthResponse

/**
 * Caso de uso para actualizar los tokens.
 *
 * Esta clase se utiliza para actualizar los tokens del usuario cada vez que entra a la aplicación.
 */
class UpdateTokensRequirement {
    private val repository = AuthRepository()

    /**
     * Actualiza los tokens utilizando un refresh token.
     *
     * @param refreshToken El token de actualización.
     * @return Un objeto [UpdateTokenResponse] que contiene los nuevos tokens, o null
     * si hay un error.
     */
    suspend operator fun invoke(refreshToken: String): AuthResponse? =
        repository.refreshTokens(refreshToken)
}
package com.greencircle.domain.usecase.auth

import android.content.Context
import com.greencircle.data.repository.TokenRepository
import com.greencircle.utils.Constants

/**
 * Caso de uso para eliminar los tokens.
 *
 * Esta clase se utiliza para eliminar los tokens almacenados al cerrar sesión.
 */
class DeleteTokensRequirement(private val context: Context) {
    private val sharedPreferencesName: String = Constants.SHARED_PREFERENCES_NAME
    private val sharedPreferences =
        context.getSharedPreferences(sharedPreferencesName, Context.MODE_PRIVATE)
    private val repository = TokenRepository(sharedPreferences)

    /**
     * Elimina los tokens almacenados.
     *
     * @return [null]
     */
    operator fun invoke() = repository.deleteTokens()
}
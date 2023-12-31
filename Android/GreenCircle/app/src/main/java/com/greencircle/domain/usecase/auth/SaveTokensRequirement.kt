package com.greencircle.domain.usecase.auth

import android.content.Context
import com.greencircle.data.repository.TokenRepository
import com.greencircle.utils.Constants

/**
 * Caso de uso para guardar tokens de autenticación y actualización en el almacenamiento compartido.
 *
 * Esta clase se utiliza para guardar los tokens de autenticación y actualización en el almacenamiento
 * compartido de la aplicación.
 *
 * @param context El contexto de la aplicación Android necesario para acceder al almacenamiento compartido.
 */
class SaveTokensRequirement(private val context: Context) {
    private val sharedPreferencesName: String = Constants.SHARED_PREFERENCES_NAME
    private val sharedPreferences =
        context.getSharedPreferences(sharedPreferencesName, Context.MODE_PRIVATE)
    private val repository = TokenRepository(sharedPreferences)

    /**
     * Guarda los tokens de autenticación y actualización en el almacenamiento compartido.
     *
     * @param authToken El token de autenticación a guardar.
     * @param refreshToken El token de actualización a guardar.
     */
    operator fun invoke(authToken: String, refreshToken: String): Unit =
        repository.saveTokens(authToken, refreshToken)
}
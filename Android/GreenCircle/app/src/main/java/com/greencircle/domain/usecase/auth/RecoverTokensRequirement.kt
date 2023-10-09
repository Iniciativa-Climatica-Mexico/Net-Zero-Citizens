package com.greencircle.domain.usecase.auth

import android.content.Context
import com.greencircle.data.repository.TokenRepository
import com.greencircle.domain.model.auth.Tokens
import com.greencircle.utils.Constants

/**
 * Caso de uso para recuperar tokens de autenticación y actualización almacenados.
 * Esta clase se utiliza para recuperar los tokens de autenticación y actualización almacenados en el almacenamiento compartido.
 * @param context El contexto de la aplicación Android necesario para acceder al almacenamiento compartido.
 */
class RecoverTokensRequirement(private val context: Context) {
    private val sharedPreferencesName: String = Constants.SHARED_PREFERENCES_NAME
    private val sharedPreferences =
        context.getSharedPreferences(sharedPreferencesName, Context.MODE_PRIVATE)
    private val repository = TokenRepository(sharedPreferences)

    /**
     * Recupera los tokens de autenticación y actualización almacenados.
     * @return Un objeto [Tokens] que contiene los tokens recuperados.
     * @throws Exception Si los tokens no se encuentran en el almacenamiento compartido.
     */
    operator fun invoke(): Tokens? =
        repository.recoverTokens() ?: null
}
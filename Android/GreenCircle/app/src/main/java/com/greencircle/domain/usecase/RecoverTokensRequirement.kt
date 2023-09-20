package com.greencircle.domain.usecase

import android.content.Context
import com.greencircle.data.repository.TokenRepository

/**
 * Caso de uso para recuperar tokens de autenticación y actualización almacenados.
 *
 * Esta clase se utiliza para recuperar los tokens de autenticación y actualización almacenados en el almacenamiento compartido.
 *
 * @param context El contexto de la aplicación Android necesario para acceder al almacenamiento compartido.
 */
class RecoverTokensRequirement(private val context: Context) {
    private val sharedPreferences =
        context.getSharedPreferences("my_preferences", Context.MODE_PRIVATE)
    private val repository = TokenRepository(sharedPreferences)

    /**
     * Recupera los tokens de autenticación y actualización almacenados.
     *
     * @return Un objeto [TokenRepository.Tokens] que contiene los tokens recuperados.
     * @throws Exception Si los tokens no se encuentran en el almacenamiento compartido.
     */
    suspend operator fun invoke(): TokenRepository.Tokens =
        repository.recoverTokens() ?: throw Exception("Tokens not found")
}
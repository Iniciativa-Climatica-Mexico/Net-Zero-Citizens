package com.greencircle.data.repository

import android.content.SharedPreferences
import com.greencircle.domain.model.auth.Tokens
import com.greencircle.utils.Constants

/**
 * Repositorio para gestionar operaciones relacionadas con el manejo de tokens de autenticación.
 *
 * Este repositorio proporciona métodos para guardar y recuperar tokens de autenticación y actualización.
 *
 * @param sharedPreferences El objeto [SharedPreferences] utilizado para almacenar y recuperar los tokens.
 */
class TokenRepository(private val sharedPreferences: SharedPreferences) {
    private val authTokenKey: String = Constants.AUTH_TOKEN_SP_NAME
    private val refreshTokenKey: String = Constants.REFRESH_TOKEN_SP_NAME

    /**
     * Guarda los tokens de autenticación y actualización en el almacenamiento compartido.
     *
     * @param authToken El token de autenticación.
     * @param refreshToken El token de actualización.
     */
    fun saveTokens(authToken: String, refreshToken: String) {
        val editor = sharedPreferences.edit()
        editor.putString(authTokenKey, authToken)
        editor.putString(refreshTokenKey, refreshToken)
        editor.apply()
    }

    /**
     * Recupera los tokens de autenticación y actualización almacenados previamente.
     *
     * @return Un objeto [Tokens] que contiene los tokens recuperados, o null si no se encuentran en el almacenamiento.
     */
    fun recoverTokens(): Tokens? {
        val authToken = sharedPreferences.getString(authTokenKey, null)
        val refreshToken = sharedPreferences.getString(refreshTokenKey, null)
        return if (authToken != null && refreshToken != null) {
            Tokens(authToken, refreshToken)
        } else {
            null
        }
    }

    /**
     * Elimina los tokens de autenticación y actualización almacenados previamente.
     *
     * @return [null]
     */
    fun deleteTokens() {
        val editor = sharedPreferences.edit()
        editor.remove(authTokenKey)
        editor.remove(refreshTokenKey)
        editor.apply()
    }
}
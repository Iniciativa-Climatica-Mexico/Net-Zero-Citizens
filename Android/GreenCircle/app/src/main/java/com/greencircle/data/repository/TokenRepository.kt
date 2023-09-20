package com.greencircle.data.repository

import android.content.SharedPreferences

/**
 * Repositorio para gestionar operaciones relacionadas con el manejo de tokens de autenticación.
 *
 * Este repositorio proporciona métodos para guardar y recuperar tokens de autenticación y actualización.
 *
 * @param sharedPreferences El objeto [SharedPreferences] utilizado para almacenar y recuperar los tokens.
 */
class TokenRepository(private val sharedPreferences: SharedPreferences) {
    private val authTokenKey: String = "auth_token"
    private val refreshTokenKey: String = "refresh_token"

    /**
     * Modelo de datos para almacenar tokens de autenticación y actualización.
     *
     * @param authToken El token de autenticación.
     * @param refreshToken El token de actualización.
     */
    data class Tokens(val authToken: String, val refreshToken: String)

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
}
package com.greencircle.data.repository

import android.content.SharedPreferences
import com.google.gson.Gson
import com.greencircle.domain.model.user.User

class UserSessionRepository(private val sharedPreferences: SharedPreferences) {
    private val userSession: String = "user_session"

    /**
     * Guarda los datos del usaurio activo en el almacenamiento compartido.
     *
     * @param user El usuario a guardar.
     */
    fun saveUserSession(user: User) {
        val editor = sharedPreferences.edit()
        val userJson = Gson().toJson(user)
        editor.putString(userSession, userJson)
        editor.apply()
    }

    /**
     * Recupera los datos del usuario activo almacenados previamente.
     *
     * @return Un objeto [User] que contiene los datos del usuario recuperados, o null si no se encuentran en el almacenamiento.
     */
    fun recoverUserSession(): User? {
        val userJson = sharedPreferences.getString(userSession, null)
        return if (userJson != null) {
            Gson().fromJson(userJson, User::class.java)
        } else {
            null
        }
    }

    /**
     * Elimina los datos de sesión del usuario almacenados previamente.
     *
     * @return [null]
     */
    fun deleteUserSession() {
        val editor = sharedPreferences.edit()
        editor.remove(userSession)
        editor.apply()
    }
}
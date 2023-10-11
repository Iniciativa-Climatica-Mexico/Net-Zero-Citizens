package com.greencircle.domain.usecase.auth

import android.content.Context
import com.greencircle.data.repository.UserSessionRepository
import com.greencircle.domain.model.user.User
import com.greencircle.utils.Constants

/**
 * Caso de uso para recuperar los datos del usuario en sesión almancenados.
 *
 * Esta clase se utiliza para recuperar los datos del usuario activo almacenados en el almacenamiento compartido.
 *
 * @param context El contexto de la aplicación Android necesario para acceder al almacenamiento compartido.
 */
class RecoverUserSessionRequirement(private val context: Context) {
    private val sharedPreferencesName: String = Constants.SHARED_PREFERENCES_NAME
    private val sharedPreferences =
        context.getSharedPreferences(sharedPreferencesName, Context.MODE_PRIVATE)
    private val repository = UserSessionRepository(sharedPreferences)

    /**
     * Recupera los datos del usuario activo almacenados.
     *
     * @return Un objeto [User] que contiene los datos del usuario recuperados.
     * @throws Exception Si el usuario no se encuentra en el almacenamiento compartido.
     */
    operator fun invoke(): User =
        repository.recoverUserSession() ?: throw Exception("User not found")
}
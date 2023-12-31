package com.greencircle.domain.usecase.auth

import android.content.Context
import com.greencircle.data.repository.UserSessionRepository
import com.greencircle.utils.Constants

/**
 * Caso de uso para eliminar el usuario en sesión.
 *
 * Esta clase se utiliza para eliminar los datos del usuario almacenados al cerrar sesión.
 */
class DeleteUserSessionRequirement(private val context: Context) {
    private val sharedPreferencesName: String = Constants.SHARED_PREFERENCES_NAME
    private val sharedPreferences =
        context.getSharedPreferences(sharedPreferencesName, Context.MODE_PRIVATE)
    private val repository = UserSessionRepository(sharedPreferences)

    /**
     * Elimina los datos del usuario almacenado.
     *
     * @return [null]
     */
    operator fun invoke() = repository.deleteUserSession()
}
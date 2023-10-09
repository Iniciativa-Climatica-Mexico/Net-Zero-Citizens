package com.greencircle.domain.usecase.auth

import android.content.Context
import com.greencircle.data.repository.UserSessionRepository
import com.greencircle.domain.model.user.User
import com.greencircle.utils.Constants

class SaveUserSessionRequirement(private val context: Context) {
    private val sharedPreferencesName: String = Constants.SHARED_PREFERENCES_NAME
    private val sharedPreferences =
        context.getSharedPreferences(sharedPreferencesName, Context.MODE_PRIVATE)
    private val repository = UserSessionRepository(sharedPreferences)

    /**
     * Guarda los datos del usaurio activo en el almacenamiento compartido.
     *
     * @param user El usuario a guardar.
     */
    operator fun invoke(user: User): Unit =
        repository.saveUserSession(user)
}
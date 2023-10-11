package com.greencircle.domain.usecase.auth

import android.content.Context
import com.greencircle.data.repository.UserSessionRepository
import com.greencircle.domain.model.user.User

class SaveUserSessionRequirement(private val context: Context) {
    private val sharedPreferences =
        context.getSharedPreferences("my_preferences", Context.MODE_PRIVATE)
    private val repository = UserSessionRepository(sharedPreferences)

    /**
     * Guarda los datos del usaurio activo en el almacenamiento compartido.
     *
     * @param user El usuario a guardar.
     */
    operator fun invoke(user: User): Unit =
        repository.saveUserSession(user)
}
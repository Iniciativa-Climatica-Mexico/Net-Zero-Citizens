package com.greencircle.utils

import android.app.Activity
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInClient
import com.google.android.gms.auth.api.signin.GoogleSignInOptions

/**
 * Proveedor de cliente de inicio de sesión con Google.
 * @since 2.0.0
 */
object GoogleSignInClientProvider {
    /**
     * Obtiene el cliente de inicio de sesión con Google.
     *
     * @param activity La actividad desde la que se llama al proveedor.
     * @return El cliente de inicio de sesión con Google.
     * @since 2.0.0
     */
    fun getClient(activity: Activity): GoogleSignInClient {
        val gso = GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
            .requestIdToken(Constants.GOOGLE_CLIENT_ID)
            .requestEmail()
            .build()

        return GoogleSignIn.getClient(activity, gso)
    }
}

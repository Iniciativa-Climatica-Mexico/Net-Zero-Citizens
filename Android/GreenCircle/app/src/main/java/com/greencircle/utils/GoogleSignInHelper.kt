package com.greencircle.utils

import android.app.Activity
import android.content.Intent
import android.view.View
import android.widget.Toast
import androidx.activity.result.ActivityResultLauncher
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInAccount
import com.google.android.gms.common.api.ApiException
import com.google.android.gms.common.api.CommonStatusCodes
import com.greencircle.R

/**
 * Clase de utilidad para la autenticación con Google.
 * Gestiona operaciones relacionadas con el inicio de sesión con Google.
 * @constructor Crea un objeto de utilidad para la autenticación con Google.
 * @property activity La actividad desde la que se llama a la clase de utilidad.
 * @property activityResult El resultado de la actividad
 *
 * @since 2.0.0
 */
class GoogleSignInHelper(
    private val activity: Activity,
    private val activityResult: ActivityResultLauncher<Intent>
) {
    private val mGoogleSignInClient = GoogleSignInClientProvider.getClient(activity)

    fun googleLogin(activityResult: ActivityResultLauncher<Intent>) {
        activityResult.launch(mGoogleSignInClient.signInIntent)
    }

    /**
     * Configura el botón de inicio de sesión con Google.
     *
     * @param view La vista que contiene el botón de inicio de sesión con Google.
     * @since 2.0.0
     */
    fun setupGoogleLoginListener(view: View) {
        val googleButton = view.findViewById<View>(R.id.sign_in_button)
        val account: GoogleSignInAccount? = GoogleSignIn.getLastSignedInAccount(activity)

        if (account == null) {
            googleSignOut()
        }

        googleButton.setOnClickListener {
            when (it.id) {
                R.id.sign_in_button -> {
                    googleLogin(activityResult)
                }
            }
        }
    }

    /**
     * Maneja los errores de inicio de sesión con Google.
     *
     * @param e La excepción que se va a manejar.
     * @since 2.0.0
     */
    fun handleSignInException(e: ApiException) {
        when (e.statusCode) {
            CommonStatusCodes.NETWORK_ERROR -> showToast(
                "Por favor, verifica tu conexión a internet y vuelve a intentarlo."
            )

            CommonStatusCodes.INTERNAL_ERROR -> showToast(
                "¡Vaya! Algo salió mal. Por favor, intenta de nuevo más tarde."
            )

            CommonStatusCodes.INVALID_ACCOUNT -> showToast(
                "La cuenta proporcionada parece ser inválida." +
                    "Por favor, elige una cuenta de Google válida"
            )

            CommonStatusCodes.SIGN_IN_REQUIRED -> showToast(
                "Por favor, inicia sesión para continuar"
            )

            CommonStatusCodes.ERROR -> showToast(
                "¡Vaya! Algo salió mal. Por favor, intenta de nuevo más tarde."
            )

            CommonStatusCodes.TIMEOUT -> showToast(
                "No pudimos conectarnos a nuestros servidores." +
                    "Por favor, verifica tu conexión a internet y vuelve a intentarlo."
            )

            CommonStatusCodes.CANCELED -> showToast(
                "Operación cancelada, por favor, intenta de nuevo."
            )

            else -> showToast("Lo siento, no pudimos iniciar sesión. Por favor, intenta de nuevo")
        }
    }

    /**
     * Muestra los mensajes de error de inicio de sesión con Google.
     *
     * @param message El mensaje de error que se va a mostrar.
     * @since 2.0.0
     */
    private fun showToast(message: String) {
        Toast.makeText(activity, message, Toast.LENGTH_SHORT).show()
    }

    /**
     * Cierra la sesión de Google.
     *
     * @since 2.0.0
     */
    fun googleSignOut() {
        mGoogleSignInClient.signOut()
    }
}
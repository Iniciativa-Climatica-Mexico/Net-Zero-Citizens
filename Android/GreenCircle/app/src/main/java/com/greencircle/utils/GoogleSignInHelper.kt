package com.greencircle.utils

import android.app.Activity
import android.content.Intent
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.activity.result.ActivityResultLauncher
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInAccount
import com.google.android.gms.common.api.ApiException
import com.google.android.gms.common.api.CommonStatusCodes
import com.greencircle.R
import com.greencircle.framework.viewmodel.auth.LoginViewModel

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
     * Maneja el resultado de la actividad de inicio de sesión con Google.
     *
     * @param data El intent de la actividad.
     * @since 2.0.0
     */
    fun handleGoogleSigInResult(
        activityResult: ActivityResultLauncher<Intent>,
        viewModel: LoginViewModel
    ) {
        try {
            val authResponse = viewModel.googleLoginResult.value

            if (authResponse != null) {
                if (authResponse.user.roles != "new_user") {
                    AuthUtils(activity).navigateToSurvey()
                } else {
                    showToast("Por favor, regístrate")
                    AuthUtils(activity).navigateToRegisterUser(activityResult)
                }
            } else {
                showToast("Lo sentimos, no pudimos iniciar sesión. Por favor, intenta de nuevo")
            }
        } catch (e: ApiException) {
            handleSignInException(e)
        }
    }

    /**
     * Maneja los errores de inicio de sesión con Google.
     *
     * @param e La excepción que se va a manejar.
     * @since 2.0.0
     */
    private fun handleSignInException(e: ApiException) {
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
     * Obtiene la informacion de la cuenta de Google y lo escribe en [SharedPreferences].
     *
     * @param account La cuenta de Google.
     * @since 2.0.0
     */
    fun getDataFromGoogleAccount(account: GoogleSignInAccount?) {
        val sharedPreferences = activity.getSharedPreferences(
            "com.greencircle", Activity.MODE_PRIVATE
        )

        sharedPreferences.edit().putString("givenName", account?.givenName).apply()
        sharedPreferences.edit().putString("familyName", account?.familyName).apply()
        sharedPreferences.edit().putString("displayName", account?.displayName).apply()
        sharedPreferences.edit().putString("email", account?.email).apply()
        sharedPreferences.edit().putString("photoUrl", account?.photoUrl.toString()).apply()
        sharedPreferences.edit().putString("idToken", account?.idToken).apply()

        Log.d("GoogleSignInHelper", "getDataFromGoogleAccount: $account")
    }

    /**
     * Cierra la sesión de Google.
     *
     * @since 2.0.0
     */
    private fun googleSignOut() {
        mGoogleSignInClient.signOut()
            .addOnCompleteListener(activity) {
                Log.d("GoogleSignInHelper", "signOut: $it")
            }
    }
}
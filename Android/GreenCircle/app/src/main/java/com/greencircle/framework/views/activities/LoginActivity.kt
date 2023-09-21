package com.greencircle.framework.views.activities

import ViewModelFactory
import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.common.api.ApiException
import com.greencircle.R
import com.greencircle.databinding.ActivityLoginBinding
import com.greencircle.framework.viewmodel.LoginViewModel
import com.greencircle.utils.AuthUtils

/**
 * Actividad principal para la autenticación y registro de usuarios.
 *
 * Esta actividad permite a los usuarios autenticarse con Google, registrarse como
 * empresas o usuarios individuales, y navegar a la pantalla principal de la aplicación.
 */
class LoginActivity : AppCompatActivity() {
    private lateinit var binding: ActivityLoginBinding
    private val authUtils = AuthUtils()
    private val viewModel: LoginViewModel by viewModels {
        ViewModelFactory(applicationContext)
    }

    private val registerCompanyActivityResult =
        registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result ->
            if (result.resultCode == Activity.RESULT_OK) {
                // Handle the result as needed, e.g., update UI or perform actions
            } else if (result.resultCode == Activity.RESULT_CANCELED) {
                // Handle the case where the user canceled the registration
            }
        }
    private val registerUserActivityResult =
        registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result ->
            if (result.resultCode == Activity.RESULT_OK) {
                // Handle the result as needed, e.g., update UI or perform actions
            } else if (result.resultCode == Activity.RESULT_CANCELED) {
                // Handle the case where the user canceled the registration
            }
        }
    private val googleSignInActivityResult =
        registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result ->
            if (result.resultCode == Activity.RESULT_OK) {
                val data: Intent? = result.data
                Log.d("GoogleSignIn", "data: $data")
                Log.d("GoogleSignIn", "result: $result")
                if (data != null && result.resultCode == Activity.RESULT_OK) {
                    val task = GoogleSignIn.getSignedInAccountFromIntent(data)
                    try {
                        val account = task.getResult(ApiException::class.java)
                        Log.d("Test", "${account.idToken}")
                        viewModel.googleLogin(account.idToken!!)
                    } catch (e: ApiException) {
                        Toast.makeText(
                            applicationContext,
                            "Something went wrong",
                            Toast.LENGTH_SHORT
                        ).show()
                    }
                }
            } else if (result.resultCode == Activity.RESULT_CANCELED) {
                // Handle the case where the user canceled the operation
                Log.d("GoogleSignIn", "result: $result")
            }
        }

    /**
     * Método llamado cuando se crea la actividad.
     *
     * @param savedInstanceState El estado guardado de la actividad.
     */
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Configuración de los listeners para los botones de registro de empresa y usuario
        registerCompanyOnClickListener()
        registerUserOnClickListener()

        // Google Login
        authUtils.googleLoginListener(binding, this, googleSignInActivityResult)

        // Observador para el estado de autenticación
        viewModel.googleLoginResult.observe(this) { authResponse ->
            if (authResponse != null) {
                if (authResponse.user.roles != "new_user") {
                    navigateToHome()
                } else {
                    Toast.makeText(applicationContext, "Por favor, regístrate", Toast.LENGTH_SHORT)
                        .show()
                    navigateToRegisterUser()
                }
            } else {
                // Handle the case where the Google login failed
                Toast.makeText(applicationContext, "Google login failed", Toast.LENGTH_SHORT).show()
            }
        }
    }

    // Métodos para los listeners de los botones de registro
    private fun registerCompanyOnClickListener() {
        val registerCompanyButton = binding.root.findViewById<View>(R.id.login_register_company)
        registerCompanyButton.setOnClickListener {
            navigateToRegisterCompany()
        }
    }

    private fun registerUserOnClickListener() {
        val registerUserButton = binding.root.findViewById<View>(R.id.login_register_user)
        registerUserButton.setOnClickListener {
            navigateToRegisterUser()
        }
    }

    // Métodos de navegación
    private fun navigateToHome() {
        var intent: Intent = Intent(this, SurveyActivity::class.java)
        startActivity(intent)
        finish()
    }

    private fun navigateToRegisterCompany() {
        var intent: Intent = Intent(this, RegisterCompanyActivity::class.java)
        registerCompanyActivityResult.launch(intent)
    }

    private fun navigateToRegisterUser() {
        var intent: Intent = Intent(this, RegisterUserActivity::class.java)
        registerUserActivityResult.launch(intent)
    }
}
package com.greencircle.framework.views.activities

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.Observer
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.common.api.ApiException
import com.greencircle.databinding.ActivitySplashscreenBinding
import com.greencircle.framework.viewmodel.ViewModelFactory
import com.greencircle.framework.viewmodel.auth.LoginViewModel
import com.greencircle.framework.viewmodel.splashscreen.SplashscreenViewModel
import com.greencircle.utils.AuthUtils
import com.greencircle.utils.GoogleSignInHelper

/**
 * Actividad de presentación que se muestra al iniciar la aplicación.
 *
 * Esta actividad se encarga de mostrar una pantalla de carga (splash screen) mientras se inicializa la aplicación.
 * Una vez que la inicialización está completa, la actividad redirige al usuario a la pantalla de inicio de sesión.
 */
class SplashscreenActivity : AppCompatActivity() {
    private lateinit var binding: ActivitySplashscreenBinding
    private val viewModel: SplashscreenViewModel by viewModels {
        ViewModelFactory(applicationContext, SplashscreenViewModel::class.java)
    }
    private val loginViewModel: LoginViewModel by viewModels {
        ViewModelFactory(applicationContext, LoginViewModel::class.java)
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
                        loginViewModel.googleLogin(account.idToken!!)
                    } catch (e: ApiException) {
                        Toast.makeText(
                            applicationContext, "Something went wrong", Toast.LENGTH_SHORT
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
     * @param savedInstances El estado guardado de la actividad.
     */
    override fun onCreate(savedInstances: Bundle?) {
        super.onCreate(savedInstances)
        initializeBinding()
        viewModel.onCreate()
        initializeObservers()

        val googleSignInHelper = GoogleSignInHelper(this, googleSignInActivityResult)
        googleSignInHelper.automaticGoogleLogin()

        loginViewModel.googleLoginResult.observe(this) { authResponse ->
            val task = GoogleSignIn.getSignedInAccountFromIntent(intent)
            Log.d("GoogleSignIn", "task: $task")
            try {
                if (authResponse != null) {
                    if (authResponse.user.roles != "new_user") {
                        AuthUtils(this).navigateToMain()
                    } else {
                        AuthUtils(this).navigateToLogin()
                    }
                }
            } catch (e: ApiException) {
                googleSignInHelper.handleSignInException(e)
            }
        }
    }

    /**
     * Inicializa los observadores para las actualizaciones del estado de carga.
     */
    private fun initializeObservers() {
        viewModel.finishedLoading.observe(
            this,
            Observer { finishedLoading ->
                if (finishedLoading) {
                    viewModel.isUserLoggedIn.observe(
                        this,
                        Observer { isUserLoggedIn ->
                            if (isUserLoggedIn) passViewGoToMain()
                            else passViewGoToLogin()
                        }
                    )
                    viewModel.userUncompletedRegister.observe(
                        this,
                        Observer { userUncompletedRegister ->
                            if (userUncompletedRegister) passViewGoToLogin()
                        }
                    )
                }
            }
        )
    }

    /**
     * Inicializa el enlace de datos de la actividad.
     */
    private fun initializeBinding() {
        binding = ActivitySplashscreenBinding.inflate(layoutInflater)
        setContentView(binding.root)
    }

    /**
     * Redirige al usuario a la pantalla de inicio de sesión (LoginActivity).
     */
    private fun passViewGoToLogin() {
        var intent: Intent = Intent(this, LoginActivity::class.java)
        intent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP)
        startActivity(intent)
        finish()
    }

    /**
     * Redirige al usuario a la pantalla de encuesta (SurveyActivity).
     */
    private fun passViewGoToMain() {
        var intent: Intent = Intent(this, MainActivity::class.java)
        intent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP)
        startActivity(intent)
        finish()
    }
}
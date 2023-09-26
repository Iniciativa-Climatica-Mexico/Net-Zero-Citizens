package com.greencircle.framework.views.activities

import android.content.Intent
import android.os.Bundle
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.Observer
import com.greencircle.databinding.ActivitySplashscreenBinding
import com.greencircle.framework.viewmodel.splashscreen.SplashscreenViewModel
import com.greencircle.framework.viewmodel.splashscreen.SplashscreenViewModelFactory

/**
 * Actividad de presentación que se muestra al iniciar la aplicación.
 *
 * Esta actividad se encarga de mostrar una pantalla de carga (splash screen) mientras se inicializa la aplicación.
 * Una vez que la inicialización está completa, la actividad redirige al usuario a la pantalla de inicio de sesión.
 */
class SplashscreenActivity : AppCompatActivity() {
    private lateinit var binding: ActivitySplashscreenBinding
    private val viewModel: SplashscreenViewModel by viewModels {
        SplashscreenViewModelFactory(applicationContext)
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
                            if (isUserLoggedIn) passViewGoToSurvey()
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
    private fun passViewGoToSurvey() {
        var intent: Intent = Intent(this, SurveyActivity::class.java)
        intent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP)
        startActivity(intent)
        finish()
    }
}
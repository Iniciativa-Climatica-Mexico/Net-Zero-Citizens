package com.greencircle.framework.views.activities

import android.content.Intent
import android.os.Bundle
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.Observer
import com.greencircle.databinding.ActivitySplashscreenBinding
import com.greencircle.framework.viewmodel.SplashscreenViewModel
import com.greencircle.framework.views.MainActivity

/**
 * Actividad de presentación que se muestra al iniciar la aplicación.
 *
 * Esta actividad se encarga de mostrar una pantalla de carga (splash screen) mientras se inicializa la aplicación.
 * Una vez que la inicialización está completa, la actividad redirige al usuario a la pantalla de inicio de sesión.
 */
class SplashscreenActivity : AppCompatActivity() {
    private lateinit var binding: ActivitySplashscreenBinding
    private val viewModel: SplashscreenViewModel by viewModels()

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
                    passViewGoToMain()
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
    private fun passViewGoToMain() {
        var intent: Intent = Intent(this, SurveyActivity::class.java)
        intent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP)
        startActivity(intent)
        finish()
    }
}
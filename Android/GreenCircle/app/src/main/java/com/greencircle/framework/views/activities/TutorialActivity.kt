package com.greencircle.framework.views.activities

import android.content.Intent
import android.os.Bundle
import androidx.fragment.app.Fragment
import com.github.appintro.AppIntro
import com.github.appintro.AppIntroFragment
import com.greencircle.R

class TutorialActivity : AppIntro() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        addSlide(
            AppIntroFragment.createInstance(
                title = "Welcome...",
                description = "This is the first slide of the example",
                backgroundDrawable = R.drawable.ic_launcher_background
            )
        )
        addSlide(
            AppIntroFragment.createInstance(
                title = "...Let's get started!",
                description = "This is the last slide, I won't annoy you more :)",
                backgroundDrawable = R.drawable.ic_launcher_background
            )
        )
    }

    override fun onSkipPressed(currentFragment: Fragment?) {
        super.onSkipPressed(currentFragment)
        navigateToHome()
        finish()
    }

    override fun onDonePressed(currentFragment: Fragment?) {
        super.onDonePressed(currentFragment)
        navigateToHome()
        finish()
    }

    /**
     * Navega a la pantalla de inicio de la aplicación.
     *
     * Esta función se encarga de crear un intent para abrir la actividad principal de la aplicación
     * (`MainActivity`) y luego inicia la actividad para mostrar la pantalla de inicio.
     */
    private fun navigateToHome() {
        var intent: Intent = Intent(this, MainActivity::class.java)
        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
        startActivity(intent)
    }
}
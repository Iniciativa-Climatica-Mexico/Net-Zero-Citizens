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
                title = "Enterate de las ultimas Noticias",
                backgroundDrawable = R.drawable.android_tutorial_ecoinfo
            )
        )
        addSlide(
            AppIntroFragment.createInstance(
                backgroundDrawable = R.drawable.android_tutorial_catalogue
            )
        )
        addSlide(
            AppIntroFragment.createInstance(
                title = "Filtra por tus preferencias",
                backgroundDrawable = R.drawable.android_tutorial_filters
            )
        )
        addSlide(
            AppIntroFragment.createInstance(
                title = "Conecta con ellos",
                backgroundDrawable = R.drawable.android_tutorial_cdetail
            )
        )
        addSlide(
            AppIntroFragment.createInstance(
                title = "Guarda tus preferencias",
                backgroundDrawable = R.drawable.android_tutorial_profile
            )
        )
        addSlide(
            AppIntroFragment.createInstance(
                title = "Edita tu perfil",
                backgroundDrawable = R.drawable.android_tutorial_editp
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
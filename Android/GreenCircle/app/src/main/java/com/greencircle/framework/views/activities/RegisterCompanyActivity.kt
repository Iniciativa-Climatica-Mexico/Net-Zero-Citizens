package com.greencircle.framework.views.activities

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import com.greencircle.R
import com.greencircle.databinding.ActivityRegisterCompanyBinding
import com.greencircle.framework.views.fragments.RegisterCompanyFragment

/**
 * Actividad principal para el registro de empresas.
 *
 * Esta actividad permite a los usuarios registrarse en la aplicación. Se encarga de la gestión de fragmentos
 * para mostrar las diferentes pantallas relacionadas con el proceso de registro.
 */
class RegisterCompanyActivity : AppCompatActivity() {
    private lateinit var binding: ActivityRegisterCompanyBinding

    /**
     * Método llamado cuando se crea la actividad.
     *
     * @param savedInstanceState La instancia de Bundle que contiene datos previamente guardados de la actividad.
     */
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityRegisterCompanyBinding.inflate(
            layoutInflater
        )
        setContentView(binding.root)

        // Reemplaza el fragmento principal con el fragmento de registro de empresa.
        replaceFragment(RegisterCompanyFragment())
    }

    /**
     * Reemplaza el fragmento actual con uno nuevo. En este caso "RegisterCompanyFragment"
     *
     * @param fragment El fragmento que se va a mostrar.
     * @param data Un Bundle opcional de argumentos que contiene la información de la cuenta de Google.
     */
    fun replaceFragment(fragment: Fragment, data: Bundle? = null, addToBackStack: Boolean = true) {
        fragment.arguments = data
        val fragmentManager = supportFragmentManager
        var fragmentTransaction = fragmentManager.beginTransaction()
        fragmentTransaction.replace(R.id.register_company_fragment, fragment)

        if (addToBackStack) {
            fragmentTransaction.addToBackStack(null)
        }
        fragmentTransaction.commit()
    }

    /**
     * Maneja el evento del botón "Atrás" en la barra de navegación.
     */
    override fun onBackPressed() {
        val fragmentManager = supportFragmentManager
        if (fragmentManager.backStackEntryCount > 1) {
            // Si hay fragmentos en la pila de retroceso, retrocede al fragmento anterior.
            fragmentManager.popBackStack()
        } else {
            // Si no hay fragmentos en la pila de retroceso, finaliza la actividad.
            finish()
        }
    }
}
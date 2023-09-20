package com.greencircle.framework.views

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import com.google.android.material.bottomnavigation.BottomNavigationView
import com.greencircle.R
import com.greencircle.databinding.ActivityMainBinding
import com.greencircle.databinding.TopBarBinding
import com.greencircle.framework.views.fragments.HomeFragment
import com.greencircle.framework.views.fragments.MapFragment
import com.greencircle.framework.views.fragments.ProfileFragment

/**
 * Actividad principal que muestra la interfaz de usuario principal de la aplicación.
 *
 * Esta actividad contiene un [BottomNavigationView] que permite al usuario navegar entre dos fragmentos: [HomeFragment] y [ProfileFragment].
 */
class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    private lateinit var bottomNavigationView: BottomNavigationView
    private lateinit var topBarBinding: TopBarBinding

    /**
     * Método llamado cuando se crea la actividad.
     *
     * @param savedInstanceState El estado guardado de la actividad.
     */
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        topBarBinding = TopBarBinding.bind(binding.root)
        replaceFragment(HomeFragment())

        topBarBinding.title.text = "EcoInfo"
        bottomNavigationView = binding.bottomNaSvigation

        bottomNavigationView.setOnItemSelectedListener { menuItem ->
            when (menuItem.itemId) {
                R.id.ecoInfo -> {
                    replaceFragment(HomeFragment())
                    topBarBinding.title.text = "EcoInfo"
                    true
                }

                R.id.proveedores -> {
                    replaceFragment(ProfileFragment())
                    topBarBinding.title.text = "Proveedores"
                    true
                }

                R.id.mapa -> {
                    replaceFragment(MapFragment())
                    topBarBinding.title.text = "Mapa"
                    true
                }

                else -> false
            }
        }
    }

    /**
     * Reemplaza el fragmento actual en el contenedor (FrameLayout) con el fragmento proporcionado.
     *
     * @param fragment El fragmento que se va a mostrar.
     */
    private fun replaceFragment(fragment: Fragment) {
        val fragmentManager = supportFragmentManager
        val fragmentTransaction = fragmentManager.beginTransaction()
        fragmentTransaction.replace(R.id.frame_layout, fragment)
        fragmentTransaction.commit()
    }
}
package com.greencircle.framework.views.activities

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import com.google.android.material.bottomnavigation.BottomNavigationView
import com.greencircle.R
import com.greencircle.databinding.ActivityMainBinding
import com.greencircle.databinding.TopBarBinding
import com.greencircle.framework.views.fragments.HomeFragment
import com.greencircle.framework.views.fragments.catalogue.CatalogueFragment
import com.greencircle.framework.views.fragments.map.MapFragment
import com.greencircle.framework.views.fragments.profile.ProfileFragment

/**
 * Actividad principal que muestra la interfaz de usuario principal de la aplicación.
 *
 * Esta actividad contiene un [BottomNavigationView] que permite al usuario navegar
 * entre dos fragmentos: [HomeFragment] y [ProfileFragment].
 * Esta clase se utiliza para crear la actividad principal de la aplicación
 */
class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding
    private lateinit var bottomNavigationView: BottomNavigationView
    private lateinit var topBarBinding: TopBarBinding

    /**
     * Reemplaza el fragmento actual en el contenedor (FrameLayout) con el fragmento proporcionado.
     *
     * @param fragment El fragmento que se va a mostrar.
     */
    fun replaceFragment(fragment: Fragment, tag: String) {
        val fragmentManager = supportFragmentManager
        val fragmentTransaction = fragmentManager.beginTransaction()
            .addToBackStack(tag).replace(R.id.frame_layout, fragment)

        fragmentTransaction.commit()
    }

    /**
     * Método llamado cuando se crea la actividad.
     *
     * @param savedInstanceState El estado guardado de la actividad.
     * Esta función se utiliza para crear la actividad principal de la aplicación
     */
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        topBarBinding = TopBarBinding.bind(binding.root)
        replaceFragment(HomeFragment(), "HomeFragment")

        topBarBinding.title.text = "EcoInfo"
        bottomNavigationView = binding.bottomNaSvigation

        bottomNavigationView.setOnItemSelectedListener { menuItem ->
            when (menuItem.itemId) {
                R.id.ecoInfo -> {
                    replaceFragment(HomeFragment(), "EcoInfoFragment")
                    topBarBinding.title.text = "EcoInfo"
                    true
                }

                R.id.proveedores -> {
                    replaceFragment(CatalogueFragment(), "CatalogueFragment")
                    topBarBinding.title.text = "Catálogo de Proveedores"
                    true
                }

                R.id.mapa -> {
                    replaceFragment(MapFragment(), "MapFragment")
                    topBarBinding.title.text = "Mapa Proveedores"
                    true
                }

                R.id.perfil -> {
                    replaceFragment(ProfileFragment(), "ProfileFragment")
                    topBarBinding.title.text = "Perfil"
                    true
                }

                else -> false
            }
        }
    }

    /**
     * Método llamado cuando se presiona el botón de retroceso.
     *
     * Esta función se utiliza para controlar el comportamiento del botón de retroceso
     * en la actividad principal de la aplicación
     *
     * Si el fragmento actual es [HomeFragment], se finaliza la actividad.
     * Si el fragmento actual es [CatalogueFragment], [MapFragment] o [ProfileFragment],
     * se reemplaza el fragmento actual con [HomeFragment].
     */
    override fun onBackPressed() {
        val currentFragment = supportFragmentManager.findFragmentById(R.id.frame_layout)

        when (currentFragment) {
            is HomeFragment -> {
                finish()
            }

            is CatalogueFragment, is MapFragment, is ProfileFragment -> {
                replaceFragment(HomeFragment(), "HomeFragment")
                topBarBinding.title.text = "EcoInfo"
                bottomNavigationView.selectedItemId = R.id.ecoInfo
            }

            else -> {
                onBackPressedDispatcher.onBackPressed()
            }
        }
    }
}

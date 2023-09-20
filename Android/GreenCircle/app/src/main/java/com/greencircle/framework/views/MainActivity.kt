package com.greencircle.framework.views

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import com.google.android.material.bottomnavigation.BottomNavigationView
import com.greencircle.R
import com.greencircle.databinding.ActivityMainBinding
import com.greencircle.framework.views.fragments.CatalogueFragment
import com.greencircle.framework.views.fragments.HomeFragment

/**
 * This class is used to manage the main activity
 */
class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    private lateinit var bottomNavigationView: BottomNavigationView

    /**
     * This function is used to create the activity and replace the
     * fragment when the item is selected from the bottom navigation view
     */
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        replaceFragment(HomeFragment())

        bottomNavigationView = binding.bottomNavigation

        bottomNavigationView.setOnItemSelectedListener { menuItem ->
            when (menuItem.itemId) {
                R.id.ecoInfo -> {
                    replaceFragment(HomeFragment())
                    true
                }

                R.id.proveedores -> {
                    replaceFragment(CatalogueFragment())
                    true
                }

                else -> false
            }
        }
    }

    /**
     * This function is used to replace the fragment when the item is
     * selected from the bottom navigation view
     * @param fragment: Fragment object
     */

    private fun replaceFragment(fragment: Fragment) {
        val fragmentManager = supportFragmentManager
        val fragmentTransaction = fragmentManager.beginTransaction()
        fragmentTransaction.replace(R.id.frame_layout, fragment)
        fragmentTransaction.commit()
    }
}
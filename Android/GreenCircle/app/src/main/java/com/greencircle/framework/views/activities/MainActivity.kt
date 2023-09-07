package com.greencircle.framework.views.activities

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import com.greencircle.R
import com.greencircle.framework.views.fragments.ContactarProveedoresFragment
import com.greencircle.utils.Constants

class MainActivity : AppCompatActivity() {

    private lateinit var currentFragment: Fragment
    private var currentMenuOption: String? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main) // Set the main activity layout

        // Initialize the initial fragment and menu option
        exchangeCurrentFragment(ContactarProveedoresFragment(), Constants.CONTACTAR_PROVEEDOR)
    }

    // Function to replace the current fragment
    private fun exchangeCurrentFragment(newFragment: Fragment, newMenuOption: String) {
        currentFragment = newFragment

        supportFragmentManager.beginTransaction()
            .replace(R.id.nav_host_fragment_content_main, currentFragment)
            .commit()

        currentMenuOption = newMenuOption
    }
}

package com.greencircle.framework.views
import android.content.Context
import android.content.SharedPreferences
import android.os.Bundle
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import com.google.android.material.bottomnavigation.BottomNavigationView
import com.greencircle.R
import com.greencircle.databinding.ActivityMainBinding
import com.greencircle.framework.views.fragments.CompanyReviewFragment
import com.greencircle.framework.views.fragments.ProfileFragment

class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding
    private lateinit var bottomNavigationView: BottomNavigationView
    private lateinit var sharedPreferences: SharedPreferences

    private val PREFS_NAME = "MyPrefsFile"
    private val NOTIFICATIONS_ASKED_KEY = "notifications_asked"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        bottomNavigationView = binding.bottomNavigation

        bottomNavigationView.setOnItemSelectedListener { menuItem ->
            when (menuItem.itemId) {
                R.id.ecoInfo -> {
                    replaceFragment(CompanyReviewFragment())
                    true
                }

                R.id.perfil -> {
                    replaceFragment(ProfileFragment())
                    true
                }

                else -> false
            }
        }
        sharedPreferences = getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
        val notificationsAsked = sharedPreferences.getBoolean(NOTIFICATIONS_ASKED_KEY, false)
        if (!notificationsAsked) {
            showNotificationConfirmationDialog()
        }
    }

    private fun replaceFragment(fragment: Fragment) {
        val fragmentManager = supportFragmentManager
        val fragmentTransaction = fragmentManager.beginTransaction()
        fragmentTransaction.replace(R.id.frame_layout, fragment)
        fragmentTransaction.commit()
    }
    private fun showNotificationConfirmationDialog() {
        val builder = AlertDialog.Builder(this)
        builder.setTitle("Activar Notificaciones")
        builder.setMessage("¿Desea activar las notificaciones?")
        builder.setPositiveButton("Sí") { _, _ ->
            enableNotifications()
        }
        builder.setNegativeButton("No") { dialog, _ ->
            dialog.dismiss()
            markNotificationsAsAsked()
        }
        builder.show()
    }

    private fun enableNotifications() {
        // Aquí va tu código para habilitar las notificaciones
        markNotificationsAsAsked()
    }

    private fun markNotificationsAsAsked() {
        val editor = sharedPreferences.edit()
        editor.putBoolean(NOTIFICATIONS_ASKED_KEY, true)
        editor.apply()
    }
}

package com.greencircle.framework.views.activities

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import com.greencircle.R
import com.greencircle.databinding.ActivityRegisterCompanyBinding
import com.greencircle.framework.views.fragments.RegisterCompanyFragment

class RegisterCompanyActivity : AppCompatActivity() {
    private lateinit var binding: ActivityRegisterCompanyBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityRegisterCompanyBinding.inflate(
            layoutInflater
        )
        setContentView(binding.root)

        replaceFragment(RegisterCompanyFragment())
    }

    fun replaceFragment(fragment: Fragment, data: Bundle? = null) {
        fragment.arguments = data
        val fragmentManager = supportFragmentManager
        var fragmentTransaction = fragmentManager.beginTransaction()
        fragmentTransaction.replace(R.id.register_company_fragment, fragment)
        fragmentTransaction.addToBackStack(null)
        fragmentTransaction.commit()
    }

    override fun onBackPressed() {
        val fragmentManager = supportFragmentManager
        if (fragmentManager.backStackEntryCount > 1) {
            fragmentManager.popBackStack()
        } else {
            finish()
        }
    }
}
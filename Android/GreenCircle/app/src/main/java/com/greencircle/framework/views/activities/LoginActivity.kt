package com.greencircle.framework.views.activities

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.view.View
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import com.greencircle.R
import com.greencircle.databinding.ActivityLoginBinding

class LoginActivity : AppCompatActivity() {
    private lateinit var binding: ActivityLoginBinding
    private val REGISTER_COMPANY_REQUEST_CODE = 1
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        onRegisterCompany()
    }

    private val registerCompanyActivityResult =
        registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result ->
            if (result.resultCode == Activity.RESULT_OK) {
                // Handle the result as needed, e.g., update UI or perform actions
            } else if (result.resultCode == Activity.RESULT_CANCELED) {
                // Handle the case where the user canceled the registration
            }
        }

    private fun passViewGoToRegisterCompany() {
        var intent: Intent = Intent(this, RegisterCompanyActivity::class.java)
        registerCompanyActivityResult.launch(intent)
    }

    private fun onRegisterCompany() {
        val registerCompanyButton = binding.root.findViewById<View>(R.id.login_register_company)
        registerCompanyButton.setOnClickListener {
            passViewGoToRegisterCompany()
        }
    }
}
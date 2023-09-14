package com.greencircle.framework.views.activities

import android.content.Intent
import android.os.Bundle
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.Observer
import com.greencircle.databinding.ActivitySplashscreenBinding
import com.greencircle.framework.viewmodel.SplashscreenViewModel

class SplashscreenActivity : AppCompatActivity() {
    private lateinit var binding: ActivitySplashscreenBinding
    private val viewModel: SplashscreenViewModel by viewModels()

    override fun onCreate(savedInstances: Bundle?) {
        super.onCreate(savedInstances)
        initializeBinding()
        viewModel.onCreate()
        initializeObservers()
    }

    private fun initializeObservers() {
        viewModel.finishedLoading.observe(
            this,
            Observer { finishedLoading ->
                if (finishedLoading) {
                    passViewGoToMain()
                }
            }
        )
    }

    private fun initializeBinding() {
        binding = ActivitySplashscreenBinding.inflate(layoutInflater)
        setContentView(binding.root)
    }

    private fun passViewGoToMain() {
        var intent: Intent = Intent(this, LoginActivity::class.java)
        intent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP)
        startActivity(intent)
        finish()
    }
}
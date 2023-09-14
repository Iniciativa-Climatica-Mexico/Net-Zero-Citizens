package com.greencircle.framework.views.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.greencircle.R
import com.greencircle.framework.viewmodel.CreateCompanyViewModel

class CreateCompanyFragment : Fragment() {
    private lateinit var viewModel: CreateCompanyViewModel
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        viewModel = ViewModelProvider(this)[CreateCompanyViewModel::class.java]

        viewModel.googleLogin()

        // Inflate the layout for this fragment
        return inflater.inflate(
            R.layout.fragment_create_company,
            container, false
        )
    }
}

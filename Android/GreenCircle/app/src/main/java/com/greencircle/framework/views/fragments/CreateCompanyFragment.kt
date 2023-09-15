package com.greencircle.framework.views.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.greencircle.R
import com.greencircle.framework.viewmodel.CreateCompanyViewModel

class CreateCompanyFragment : Fragment() {
    private lateinit var viewModel: CreateCompanyViewModel
    private var arguments = Bundle()
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val view = inflater.inflate(
            R.layout.fragment_create_company,
            container, false
        )
        viewModel = ViewModelProvider(this)[CreateCompanyViewModel::class.java]
        arguments = requireArguments()

        // Texts
        val displayName = arguments.getString("displayName")
        val email = arguments.getString("email")

        val token: String = arguments.getString("idToken").toString()

        // Google Login
        viewModel.googleLogin(token)

        return view
    }
}

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
        viewModel = ViewModelProvider(this)[CreateCompanyViewModel::class.java]
        arguments = requireArguments()
        // Google Login
        val token: String = arguments.getString("idToken").toString()
        viewModel.googleLogin(token)
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val view = inflater.inflate(
            R.layout.fragment_create_company, container, false
        )
        // Set texts
        setTexts(arguments, view)

        return view
    }
}

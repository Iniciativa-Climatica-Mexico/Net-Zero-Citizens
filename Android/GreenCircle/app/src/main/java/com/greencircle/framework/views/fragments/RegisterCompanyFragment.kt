package com.greencircle.framework.views.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.greencircle.R
import com.greencircle.databinding.FragmentRegisterCompanyBinding
import com.greencircle.framework.views.activities.RegisterCompanyActivity

class RegisterCompanyFragment : Fragment() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val binding = FragmentRegisterCompanyBinding.inflate(inflater, container, false)

        val continueButton = binding.root.findViewById<View>(R.id.continueToCompanyRegisterForm)

        continueButton.setOnClickListener {
            val createCompanyFragment = CreateCompanyFragment()
            val activity = requireActivity() as RegisterCompanyActivity
            activity.replaceFragment(createCompanyFragment)
        }

        // Inflate the layout for this fragment
        return binding.root
    }
}

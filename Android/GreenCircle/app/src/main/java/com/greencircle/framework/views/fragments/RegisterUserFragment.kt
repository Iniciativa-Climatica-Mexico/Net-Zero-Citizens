package com.greencircle.framework.views.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.greencircle.R
import com.greencircle.databinding.FragmentRegisterUserBinding
import com.greencircle.framework.views.activities.RegisterUserActivity

class RegisterUserFragment : Fragment() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val binding = FragmentRegisterUserBinding.inflate(inflater, container, false)

        val continueButton = binding.root.findViewById<View>(R.id.continueToCreateUser)

        continueButton.setOnClickListener {
            val createUserFragment = CreateUserFragment()
            val activity = requireActivity() as RegisterUserActivity
            activity.replaceFragment(createUserFragment)
        }

        // Inflate the layout for this fragment
        return binding.root
    }
}

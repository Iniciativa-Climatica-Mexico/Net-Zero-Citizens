package com.greencircle.framework.views.fragments

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.fragment.app.Fragment
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.common.api.ApiException
import com.greencircle.databinding.FragmentRegisterUserBinding
import com.greencircle.framework.views.activities.RegisterUserActivity
import com.greencircle.utils.AuthUtils

class RegisterUserFragment : Fragment() {
    private var _binding: FragmentRegisterUserBinding? = null
    private val binding get() = _binding!!
    private val authUtils = AuthUtils()

    // Activity Result Contracts
    private val googleSignInActivityResult =
        registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result ->
            if (result.resultCode == Activity.RESULT_OK) {
                val data: Intent? = result.data
                Log.d("GoogleSignIn", "data: $data")
                if (data != null && result.resultCode == Activity.RESULT_OK) {
                    val task = GoogleSignIn.getSignedInAccountFromIntent(data)
                    try {
                        val account = task.getResult(ApiException::class.java)
                        navigateToForm()
                    } catch (e: ApiException) {
                        Toast.makeText(
                            requireContext(), "Something went wrong", Toast.LENGTH_SHORT
                        ).show()
                    }
                }
            } else if (result.resultCode == Activity.RESULT_CANCELED) {
                // Handle the case where the user canceled the operation
            }
        }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentRegisterUserBinding.inflate(inflater, container, false)

        // Google Login
        authUtils.googleLoginListener(binding, requireActivity(), googleSignInActivityResult)

        // Inflate the layout for this fragment
        return binding.root
    }

    // Navigate Methods
    private fun navigateToForm() {
        val createUserFragment = CreateUserFragment()
        val activity = requireActivity() as RegisterUserActivity
        activity.replaceFragment(createUserFragment)
    }
}

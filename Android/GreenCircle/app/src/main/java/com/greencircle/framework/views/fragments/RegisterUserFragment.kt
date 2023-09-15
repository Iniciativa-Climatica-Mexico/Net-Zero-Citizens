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
import com.google.android.gms.auth.api.signin.GoogleSignInAccount
import com.google.android.gms.auth.api.signin.GoogleSignInClient
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.google.android.gms.common.api.ApiException
import com.greencircle.R
import com.greencircle.databinding.FragmentRegisterUserBinding
import com.greencircle.framework.views.activities.RegisterUserActivity
import com.greencircle.utils.Constants

class RegisterUserFragment : Fragment() {
    private var _binding: FragmentRegisterUserBinding? = null
    private val binding get() = _binding!!
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
                        Log.d("GoogleSignIn", "Signed in successfully")
                        Log.d("GoogleSignIn", "account: $account")

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
        googleLoginListener()

        // Inflate the layout for this fragment
        return binding.root
    }

    // Google Login
    private fun googleLoginListener() {
        val googleButton = binding.root.findViewById<View>(R.id.sign_in_button)
        val activity = requireActivity() as RegisterUserActivity

        // Configure sign-in to request the user's ID, email address, and basic
        // profile. ID and basic profile are included in DEFAULT_SIGN_IN.
        val gso =
            GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestIdToken(Constants.GOOGLE_CLIENT_ID)
                .requestEmail()
                .build()
        val mGoogleSignInClient = GoogleSignIn.getClient(activity, gso)

        val acct: GoogleSignInAccount? = GoogleSignIn.getLastSignedInAccount(activity)
        Log.d("GoogleSignIn", "acct: $acct")
        if (acct != null) {
            navigateToForm()
        }

        googleButton.setOnClickListener {
            when (it.id) {
                R.id.sign_in_button -> googleLogin(mGoogleSignInClient)
            }
        }
    }

    private fun googleLogin(mGoogleSignInClient: GoogleSignInClient) {
        val signInIntent: Intent = mGoogleSignInClient.signInIntent
        googleSignInActivityResult.launch(signInIntent)
    }

    // Navigate Methods
    private fun navigateToForm() {
        val createUserFragment = CreateUserFragment()
        val activity = requireActivity() as RegisterUserActivity
        activity.replaceFragment(createUserFragment)
    }
}

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
import com.greencircle.databinding.FragmentRegisterCompanyBinding
import com.greencircle.framework.views.activities.RegisterCompanyActivity
import com.greencircle.utils.Constants

class RegisterCompanyFragment : Fragment() {
    private var _binding: FragmentRegisterCompanyBinding? = null
    private val binding get() = _binding!!
    // Activity Result Contracts
    private val googleSignInActivityResult =
        registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result ->
            if (result.resultCode == Activity.RESULT_OK) {
                val data: Intent? = result.data
                if (data != null && result.resultCode == Activity.RESULT_OK) {
                    val task = GoogleSignIn.getSignedInAccountFromIntent(data)
                    try {
                        val account = task.getResult(ApiException::class.java)
                        val arguments = getDataFromGoogleAccount(account)
                        navigateToForm(arguments)
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
        _binding = FragmentRegisterCompanyBinding.inflate(inflater, container, false)

        // Google Login
        googleLoginListener()

        // Inflate the layout for this fragment
        return binding.root
    }

    // Google Login
    private fun googleLoginListener() {
        val googleButton = binding.root.findViewById<View>(R.id.sign_in_button)
        val activity = requireActivity() as RegisterCompanyActivity

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
            // Cambiar por navigateToForm()
            googleSignOut(mGoogleSignInClient)
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

    private fun googleSignOut(mGoogleSignInClient: GoogleSignInClient) {
        mGoogleSignInClient.signOut()
    }

    private fun getDataFromGoogleAccount(account: GoogleSignInAccount?): Bundle {
        val arguments = Bundle()

        arguments.putString("givenName", account?.givenName)
        arguments.putString("familyName", account?.familyName)
        arguments.putString("displayName", account?.displayName)
        arguments.putString("email", account?.email)
        arguments.putString("photoUrl", account?.photoUrl.toString())
        arguments.putString("idToken", account?.idToken)

        Log.d("Token", account?.id.toString())

        return arguments
    }

    // Navigate Methods
    private fun navigateToForm(arguments: Bundle? = null) {
        val createCompanyFragment = CreateCompanyFragment()
        val activity = requireActivity() as RegisterCompanyActivity
        activity.replaceFragment(createCompanyFragment, arguments)
    }
}

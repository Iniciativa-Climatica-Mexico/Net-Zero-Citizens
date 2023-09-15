package com.greencircle.utils

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.View
import androidx.activity.result.ActivityResultLauncher
import androidx.viewbinding.ViewBinding
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInAccount
import com.google.android.gms.auth.api.signin.GoogleSignInClient
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.greencircle.R

class AuthUtils {
    private fun googleLogin(
        mGoogleSignInClient: GoogleSignInClient,
        activityResult: ActivityResultLauncher<Intent>
    ) {
        val signInIntent: Intent = mGoogleSignInClient.signInIntent
        activityResult.launch(signInIntent)
    }

    private fun googleSignOut(mGoogleSignInClient: GoogleSignInClient) {
        mGoogleSignInClient.signOut()
    }

    fun <T : ViewBinding, A : Activity> googleLoginListener(
        binding: T,
        activity: A,
        activityResult: ActivityResultLauncher<Intent>
    ) {
        val googleButton = binding.root.findViewById<View>(R.id.sign_in_button)
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
            // TODO Cambiar por navigateToForm()
            googleSignOut(mGoogleSignInClient)
        }

        googleButton.setOnClickListener {
            when (it.id) {
                R.id.sign_in_button -> googleLogin(
                    mGoogleSignInClient,
                    activityResult
                )
            }
        }
    }

    fun getDataFromGoogleAccount(account: GoogleSignInAccount?): Bundle {
        val arguments = Bundle()
        arguments.putString("givenName", account?.givenName)
        arguments.putString("familyName", account?.familyName)
        arguments.putString("displayName", account?.displayName)
        arguments.putString("email", account?.email)
        arguments.putString("photoUrl", account?.photoUrl.toString())
        arguments.putString("idToken", account?.idToken)

        return arguments
    }
}
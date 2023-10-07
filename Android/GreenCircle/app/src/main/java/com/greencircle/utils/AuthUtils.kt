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
import com.greencircle.domain.model.user.User
import com.greencircle.framework.views.activities.SurveyActivity

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
            googleSignOut(mGoogleSignInClient)
            // navigateToMainActivity(activity, getDataFromGoogleAccount(acct))
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

    fun getDataFromRegisterResponse(user: User): Bundle {
        val arguments = Bundle()
        arguments.putString("givenName", user.firstName)
        arguments.putString("familyName", user.lastName)
        arguments.putString("displayName", user.firstName + " " + user.lastName)
        arguments.putString("email", user.email)
        arguments.putString("photoUrl", user.picture)
        arguments.putString("idToken", null)
        arguments.putString("uuid", user.uuid.toString())

        return arguments
    }

    fun navigateToMainActivity(activity: Activity, arguments: Bundle) {
        val intent = Intent(activity, SurveyActivity::class.java)
        intent.putExtras(arguments)
        activity.startActivity(intent)
        activity.finish()
    }
}
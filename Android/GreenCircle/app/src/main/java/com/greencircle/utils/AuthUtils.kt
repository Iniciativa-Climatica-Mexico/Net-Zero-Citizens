package com.greencircle.utils

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import androidx.activity.result.ActivityResultLauncher
import com.google.android.gms.auth.api.signin.GoogleSignInAccount
import com.greencircle.framework.views.activities.RegisterCompanyActivity
import com.greencircle.framework.views.activities.RegisterUserActivity
import com.greencircle.framework.views.activities.SurveyActivity

class AuthUtils(private val activity: Activity) {
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

    // Funciones de navegacion
    fun navigateToSurvey() {
        val intent = Intent(activity, SurveyActivity::class.java)

        activity.startActivity(intent)
        activity.finish()
    }

    fun navigateToRegisterUser(activityResult: ActivityResultLauncher<Intent>) {
        val intent = Intent(activity, RegisterUserActivity::class.java)

        activityResult.launch(intent)
    }

    fun navigateToRegisterCompany(activityResult: ActivityResultLauncher<Intent>) {
        val intent = Intent(activity, RegisterCompanyActivity::class.java)

        activityResult.launch(intent)
    }
}
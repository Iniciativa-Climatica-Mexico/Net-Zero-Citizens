package com.greencircle.utils

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import androidx.activity.result.ActivityResultLauncher
import com.google.android.gms.auth.api.signin.GoogleSignInAccount
import com.greencircle.domain.model.user.User
import com.greencircle.framework.views.activities.LoginActivity
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

    fun LogOut(activity: Activity) {
        val intent = Intent(activity, LoginActivity::class.java)
        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK

        activity.startActivity(intent)
        activity.finish()
    }
}
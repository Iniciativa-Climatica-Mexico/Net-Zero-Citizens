package com.greencircle.utils

import android.Manifest
import android.content.Context
import android.content.pm.PackageManager
import androidx.core.app.ActivityCompat

class RequestPermissions {
    fun requestPermissions(context: Context) {
        val PERMISSION_ALL = 1
        val PERMISSIONS = arrayOf(
            Manifest.permission.ACCESS_FINE_LOCATION,
            Manifest.permission.ACCESS_COARSE_LOCATION,
            Manifest.permission.READ_EXTERNAL_STORAGE,
        )

        if (!hasPermissions(context, *PERMISSIONS)) {
            ActivityCompat.requestPermissions(
                context as androidx.fragment.app.FragmentActivity,
                PERMISSIONS,
                PERMISSION_ALL
            )
        }
    }

    private fun hasPermissions(context: Context, vararg permissions: String): Boolean =
        permissions.all {
            ActivityCompat.checkSelfPermission(context, it) == PackageManager.PERMISSION_GRANTED
        }
}
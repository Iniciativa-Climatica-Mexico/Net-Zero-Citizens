package com.greencircle.data.remote

import android.util.Log
import com.greencircle.domain.model.User

class UserAPIClient {
    private lateinit var api: UserAPIService
    suspend fun getUser(userId: String): User? {
        api = UserNetworkModuleDI()
        return try {
            Log.d("api", api.toString())
            api.getUser(userId)
        } catch (e: java.lang.Exception) {
            Log.d("error123", e.toString())
            e.printStackTrace()
            null
        }
    }
}
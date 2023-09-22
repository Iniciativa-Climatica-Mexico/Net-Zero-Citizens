package com.greencircle.data.remote.profile

import android.util.Log
import com.greencircle.domain.model.profile.Profile
import java.util.UUID

class ProfileAPIClient {
    private lateinit var api: ProfileAPIService
    suspend fun getProfile(userId: UUID): Profile? {
        api = ProfileNetworkModuleDI()
        return try {
            Log.d("api", api.toString())
            api.getUser(userId)
        } catch (e: java.lang.Exception) {
            Log.d("error123", e.toString())
            e.printStackTrace()
            null
        }
    }

    suspend fun updateProfile(userId: UUID, profile: Profile): Profile? {
        api = ProfileNetworkModuleDI()
        return try {
            api.updateUser(userId, profile)
        } catch (e: java.lang.Exception) {
            e.printStackTrace()
            null
        }
    }
}
package com.greencircle.data.remote.profile

import com.greencircle.data.remote.NetworkModel
import com.greencircle.domain.model.profile.Profile
import java.util.UUID

class ProfileAPIClient {
    private lateinit var api: ProfileAPIService
    suspend fun getProfile(authToken: String, userId: UUID): Profile? {
        api = NetworkModel(authToken, ProfileAPIService::class.java)
        return try {
            api.getUser(userId)
        } catch (e: java.lang.Exception) {
            e.printStackTrace()
            null
        }
    }

    suspend fun updateProfile(authToken: String, userId: UUID, profile: Profile): Profile? {
        api = NetworkModel(authToken, ProfileAPIService::class.java)
        return try {
            api.updateUser(userId, profile)
        } catch (e: java.lang.Exception) {
            e.printStackTrace()
            null
        }
    }
}
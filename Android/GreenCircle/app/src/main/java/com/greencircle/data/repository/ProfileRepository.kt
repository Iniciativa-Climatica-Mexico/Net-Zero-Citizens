package com.greencircle.data.repository

import com.greencircle.data.remote.profile.ProfileAPIClient
import com.greencircle.domain.model.profile.Profile
import java.util.UUID

class ProfileRepository {
    private val api = ProfileAPIClient()
    suspend fun getUser(authToken: String, userId: UUID): Profile? {
        return api.getProfile(authToken, userId)
    }

    suspend fun updateUser(authToken: String, userId: UUID, profile: Profile): Profile? {
        return api.updateProfile(authToken, userId, profile)
    }
}
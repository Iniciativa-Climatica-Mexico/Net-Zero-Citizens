package com.greencircle.data.repository

import com.greencircle.data.remote.profile.ProfileAPIClient
import com.greencircle.domain.model.profile.Profile
import java.util.UUID

class ProfileRepository {
    private val api = ProfileAPIClient()
    suspend fun getUser(userId: UUID): Profile? {
        return api.getProfile(userId)
    }

    suspend fun updateUser(userId: UUID, profile: Profile): Profile? {
        return api.updateProfile(userId, profile)
    }
}
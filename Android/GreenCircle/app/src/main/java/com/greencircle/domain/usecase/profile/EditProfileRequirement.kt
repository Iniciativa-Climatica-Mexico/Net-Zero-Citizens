package com.greencircle.domain.usecase.profile

import com.greencircle.data.repository.ProfileRepository
import com.greencircle.domain.model.profile.Profile
import java.util.UUID

class EditProfileRequirement {
    private val repository = ProfileRepository()
    suspend operator fun invoke(authToken: String, userId: UUID, profile: Profile): Profile? =
        repository.updateUser(authToken, userId, profile)
}
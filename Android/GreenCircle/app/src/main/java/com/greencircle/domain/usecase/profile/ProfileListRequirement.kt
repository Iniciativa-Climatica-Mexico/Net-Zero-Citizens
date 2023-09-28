package com.greencircle.domain.usecase.profile

import com.greencircle.data.repository.ProfileRepository
import com.greencircle.domain.model.profile.Profile
import java.util.UUID

class ProfileListRequirement {
    private val repository = ProfileRepository()
    suspend operator fun invoke(authToken: String, userId: UUID): Profile? =
        repository.getUser(authToken, userId)
}
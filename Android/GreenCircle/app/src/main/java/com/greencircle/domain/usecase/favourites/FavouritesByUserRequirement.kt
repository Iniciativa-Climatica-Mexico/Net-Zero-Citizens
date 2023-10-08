package com.greencircle.domain.usecase.favourites

import com.greencircle.data.repository.FavouritesRepository
import com.greencircle.domain.model.favourites.FavouriteResponse
import java.util.UUID

class FavouritesByUserRequirement {
    private val repository = FavouritesRepository()
    suspend operator fun invoke(authToken: String, userId: UUID): FavouriteResponse ? =
        repository.getAllFavouritesByUser(authToken, userId)
}
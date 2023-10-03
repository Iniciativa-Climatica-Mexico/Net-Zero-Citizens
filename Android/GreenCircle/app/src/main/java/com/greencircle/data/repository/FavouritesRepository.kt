package com.greencircle.data.repository

import com.greencircle.data.remote.favourites.FavouritesAPIClient
import com.greencircle.domain.model.favourites.Favourites
import java.util.UUID

class FavouritesRepository {
    private val api = FavouritesAPIClient()
    suspend fun getAllFavouritesByUser(authToken: String, userId: UUID): List<Favourites> ? {
        return api.getAllFavouritesByUser(authToken, userId)
    }
}
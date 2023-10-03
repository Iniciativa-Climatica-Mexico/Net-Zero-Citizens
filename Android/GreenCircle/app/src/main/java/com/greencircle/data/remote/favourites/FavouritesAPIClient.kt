package com.greencircle.data.remote.favourites

import com.greencircle.data.remote.NetworkModel
import com.greencircle.domain.model.favourites.Favourites
import java.util.UUID

class FavouritesAPIClient {
    private lateinit var api: FavouritesAPIService
    suspend fun getAllFavouritesByUser(authToken: String, userId: UUID): List<Favourites> ? {
        api = NetworkModel(authToken, FavouritesAPIService::class.java)
        return try {
            api.getAllFavouritesByUser(userId)
        } catch (e: java.lang.Exception) {
            e.printStackTrace()
            null
        }
    }
}
package com.greencircle.data.remote.favourites

import com.greencircle.data.remote.NetworkModel
import com.greencircle.domain.model.favourites.FavouriteRequest
import com.greencircle.domain.model.favourites.FavouriteResponse
import java.util.UUID

class FavouritesAPIClient {
    private lateinit var api: FavouritesAPIService

    suspend fun getAllFavouritesByUser(authToken: String, userId: UUID): FavouriteResponse ? {
        api = NetworkModel(authToken, FavouritesAPIService::class.java)
        return try {
            api.getAllFavouritesByUser(userId)
        } catch (e: java.lang.Exception) {
            e.printStackTrace()
            null
        }
    }

    suspend fun markAsFavourite(authToken: String, params: FavouriteRequest) {
        api = NetworkModel(authToken, FavouritesAPIService::class.java)

        try {
            api.markAsFavourite(params)
        } catch (e: java.lang.Exception) {
            e.printStackTrace()
        }
    }

    suspend fun unmarkAsFavourite(authToken: String, params: FavouriteRequest) {
        api = NetworkModel(authToken, FavouritesAPIService::class.java)

        try {
            api.unmarkAsFavourite(params.companyId, params.userId)
        } catch (e: java.lang.Exception) {
            e.printStackTrace()
        }
    }
}
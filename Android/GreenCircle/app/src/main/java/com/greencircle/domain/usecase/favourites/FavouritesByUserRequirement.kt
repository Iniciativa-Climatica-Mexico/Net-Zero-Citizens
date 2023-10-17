package com.greencircle.domain.usecase.favourites

import android.util.Log
import com.greencircle.data.repository.FavouritesRepository
import com.greencircle.domain.model.favourites.FavouriteRequest
import com.greencircle.domain.model.favourites.FavouriteResponse
import java.util.UUID

class FavouritesByUserRequirement {
    private val repository = FavouritesRepository()
    suspend operator fun invoke(authToken: String, userId: UUID): FavouriteResponse? =
        repository.getAllFavouritesByUser(authToken, userId)

    suspend fun markAsFavourite(authToken: String, params: FavouriteRequest) {
        Log.d("Params to mark: ", params.toString())
        repository.markAsFavourite(authToken, params)
    }
}
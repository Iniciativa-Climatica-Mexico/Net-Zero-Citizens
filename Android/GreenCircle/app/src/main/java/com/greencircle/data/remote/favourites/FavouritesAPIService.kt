package com.greencircle.data.remote.favourites

import com.greencircle.domain.model.favourites.Favourites
import java.util.UUID
import retrofit2.http.GET
import retrofit2.http.Path
interface FavouritesAPIService {
    @GET("favourites/user/{userId}")
    suspend fun getAllFavouritesByUser(
        @Path("userId") userId: UUID
    ): Favourites
}
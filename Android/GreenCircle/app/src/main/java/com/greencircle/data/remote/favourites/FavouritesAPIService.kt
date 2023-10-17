package com.greencircle.data.remote.favourites

import com.greencircle.domain.model.favourites.FavouriteRequest
import com.greencircle.domain.model.favourites.FavouriteResponse
import java.util.UUID
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Path

interface FavouritesAPIService {
    @GET("favourites/user/{userId}")
    suspend fun getAllFavouritesByUser(
        @Path("userId") userId: UUID
    ): FavouriteResponse

    @POST("favourites/create")
    suspend fun markAsFavourite(
        @Body params: FavouriteRequest
    )
}
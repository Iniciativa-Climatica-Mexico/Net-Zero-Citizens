package com.greencircle.domain.model.favourites

data class FavouriteResponse(
    val rows: ArrayList<Favourites>,
    val start: Int,
    val pageSize: Int,
    val total: Int
)
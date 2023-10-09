package com.greencircle.domain.model.favourites

import com.google.gson.annotations.SerializedName
import java.util.Date
import java.util.UUID

data class Favourites(
    @SerializedName("favouriteId") val favouriteId: UUID,
    @SerializedName("companyId") val companyId: UUID,
    @SerializedName("userId") val userId: UUID,
    @SerializedName("savedAt") val savedAt: Date,
    @SerializedName("createdAt") val createdAt: Date,
    @SerializedName("updatedAt") val updatedAt: Date
)
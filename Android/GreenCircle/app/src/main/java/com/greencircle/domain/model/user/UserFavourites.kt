package com.greencircle.domain.model.user

import com.google.gson.annotations.SerializedName
import java.sql.Timestamp
import java.util.UUID

data class UserFavourites(
    @SerializedName("favouriteId") val favouriteId: UUID,
    @SerializedName("companyId") val companyId: UUID,
    @SerializedName("userId") val userId: UUID,
    @SerializedName("savedAt") val savedAt: Timestamp,
    @SerializedName("createdAt") val createdAt: Timestamp,
    @SerializedName("updatedAt") val updatedAt: Timestamp,
    )
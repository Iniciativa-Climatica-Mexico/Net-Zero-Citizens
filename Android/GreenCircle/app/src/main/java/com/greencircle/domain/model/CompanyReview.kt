package com.greencircle.domain.model

import com.google.gson.annotations.SerializedName
import java.sql.Timestamp
import java.util.UUID

data class CompanyReview(
    @SerializedName("reviewId") val reviewId: UUID,
    @SerializedName("UUID") val UUID: UUID,
    @SerializedName("companyId") val companyId: UUID,
    @SerializedName("reviewTitle") val reviewTitle: String,
    @SerializedName("review") val review: String,
    @SerializedName("score") val score: Int,
    @SerializedName("cratedAt") val createdAt: Timestamp,
    @SerializedName("updatedAt") val updatedAt: Timestamp,
    @SerializedName("user") val user: UserBase,
)
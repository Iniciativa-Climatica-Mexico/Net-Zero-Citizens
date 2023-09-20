package com.greencircle.domain.model

import com.google.gson.annotations.SerializedName

data class UserReview(
    @SerializedName("reviewId") val reviewId: String,
    @SerializedName("userId") val userId: String,
    @SerializedName("companyId") val companyId: String,
    @SerializedName("reviewTitle") val reviewTitle: String,
    @SerializedName("review") val review: String,
    @SerializedName("score") val score: Int,
    @SerializedName("cratedAt") val createdAt: String,
    @SerializedName("updatedAt") val updatedAt: String,
)
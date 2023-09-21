package com.greencircle.domain.model.reviews

import com.google.gson.annotations.SerializedName

data class ReviewBase(
    @SerializedName("reviewTitle") val reviewTitle: String?,
    @SerializedName("review") val review: String?,
    @SerializedName("score") val score: Int,
)

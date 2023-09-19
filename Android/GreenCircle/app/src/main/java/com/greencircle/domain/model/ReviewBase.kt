package com.greencircle.domain.model

import com.google.gson.annotations.SerializedName

data class ReviewBase(
    @SerializedName("reviewTitle") val reviewTitle: String,
    @SerializedName("comment") val review: String,
    @SerializedName("score") val score: Int,
)

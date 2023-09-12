package com.greencircle.domain.model

import com.google.gson.annotations.SerializedName

data class CompanyReview(
    @SerializedName("reviewId") val reviewId: String,
    @SerializedName("UUID") val UUID: String,
    @SerializedName("companyId") val companyId: String,
    @SerializedName("review") val review: String,
    @SerializedName("score") val rating: Int,
    @SerializedName("cratedAt") val createdAt: String,
    @SerializedName("updatedAt") val updatedAt: String,
    @SerializedName("user") val user: UserBase,
)
package com.greencircle.domain.model

import com.google.gson.annotations.SerializedName

data class CompanyReviewObject(
    @SerializedName("total") val total: Int,
    @SerializedName("rows") val rows: ArrayList<CompanyReview>
)

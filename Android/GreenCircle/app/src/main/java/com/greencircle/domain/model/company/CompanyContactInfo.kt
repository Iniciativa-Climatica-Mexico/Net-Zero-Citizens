package com.greencircle.domain.model.company

import com.google.gson.annotations.SerializedName

data class CompanyContactInfo(
    @SerializedName("webPage") val webPage: String,
    @SerializedName("email") val email: String,
    @SerializedName("phoneNumber") val phone: String,
    @SerializedName("direction") val direction: String,
)
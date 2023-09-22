package com.greencircle.domain.model

import com.google.gson.annotations.SerializedName

data class CompanyObject(
    @SerializedName("rows") val companies: List<Company>,
    @SerializedName("start") val start: Int,
    @SerializedName("pageSize") val pageSize: Int,
    @SerializedName("total") val total: Int
)

data class Company(
    @SerializedName("companyId") val companyId: String,
    @SerializedName("name") val name: String,
    @SerializedName("latitude") val latitude: Double,
    @SerializedName("longitude") val longitude: Double,
    @SerializedName("profilePicture") val profilePicture: String
)
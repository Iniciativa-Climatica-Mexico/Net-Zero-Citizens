package com.greencircle.domain.model

import com.google.gson.annotations.SerializedName

data class ServicesObject(
    @SerializedName("count") val count: Int,
    @SerializedName("results") val results: ArrayList<com.greencircle.domain.model.ServiceItem>
)
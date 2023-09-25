package com.greencircle.domain.model.profile

import com.google.gson.annotations.SerializedName

data class ProfileObject(
    @SerializedName("total") val total: Int,
    @SerializedName("rows") val rows: ArrayList<Profile>,
)

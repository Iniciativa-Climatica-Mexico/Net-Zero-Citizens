package com.greencircle.domain.model.complaints

import com.google.gson.annotations.SerializedName

enum class ComplaintStatus {
    @SerializedName("active") ACTIVE,
    @SerializedName("inactive") INACTIVE,
    @SerializedName("invalid") INVALID
}
package com.greencircle.domain.model.complaints

import com.google.gson.annotations.SerializedName
import java.util.Locale

enum class ComplaintStatus {
    @SerializedName("active") ACTIVE,
    @SerializedName("inactive") INACTIVE,
    @SerializedName("invalid") INVALID;

    fun toLowerCase(): Any {
        return this.toString().lowercase(Locale.ROOT)
    }
}
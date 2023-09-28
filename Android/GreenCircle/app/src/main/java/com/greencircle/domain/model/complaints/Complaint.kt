package com.greencircle.domain.model.complaints

import com.google.gson.annotations.SerializedName

data class Complaint(
    @SerializedName("complaintSubject") val complaintTitle: String,
    @SerializedName("complaintDescription") val complaintDescription: String,
    @SerializedName("complaintStatus") val status: ComplaintStatus,
)

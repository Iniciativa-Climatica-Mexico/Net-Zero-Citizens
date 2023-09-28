package com.greencircle.domain.model.complaints

import com.google.gson.annotations.SerializedName
import java.util.UUID

data class Complaint(
    @SerializedName("idUsuario") val idUser: UUID,
    @SerializedName("idCompany") val idCompany: UUID,
    @SerializedName("companyName") val companyName: String,
    @SerializedName("complaintTitle") val complaintTitle: String,
    @SerializedName("complaintDescription") val complaintDescription: String,
)

package com.greencircle.domain.model

import com.google.gson.annotations.SerializedName
import java.sql.Timestamp

/*
* Clase que representa el objeto con los servicios
 */
data class ServiceItem(
    @SerializedName("companyId") val companyId: String,
    @SerializedName("productId") val productId: String,
    @SerializedName("name") val name: String,
    @SerializedName("description") val description: String,
    @SerializedName("imgUrl") val imgUrl: String,
    @SerializedName("createdAt") val createdAt: Timestamp,
    @SerializedName("updatedAt") val updatedAt: Timestamp
)
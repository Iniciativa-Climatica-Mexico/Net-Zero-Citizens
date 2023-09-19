package com.greencircle.domain.model

import com.google.gson.annotations.SerializedName
import java.util.UUID

/*
* Clase que representa el objeto con los servicios
 */
data class ServiceItem(
    @SerializedName("productId") val productId: UUID,
    @SerializedName("name") val name: String,
    @SerializedName("description") val description: String? = null,
    @SerializedName("imgUrl") val imgUrl: String,
)
package com.greencircle.domain.model.service

import com.google.gson.annotations.SerializedName

/*
* Clase que representa el objeto con los servicios
 */
data class ServicesObject(
    @SerializedName("results") val results: ArrayList<ServiceItem>
)
package com.greencircle.domain.model.googlemaps

import com.google.gson.annotations.SerializedName
import java.util.UUID

/**
 * Modela la tabla companias aprobadas
 * @since 0.0.1
 *
 * @property companyId Identificador único de la empresa
 * @property name de la empresa
 * @property latitude ubicacion latitud
 * @property longitude ubicacion longitud
 * @property profilePircure Imagen de perfil de la empresa
 */
data class CompanyObject(
    val companies: Array<Company>,
)

data class Company(
    @SerializedName("companyId") val companyId: UUID,
    @SerializedName("name") val name: String,
    @SerializedName("latitude") val latitude: Double,
    @SerializedName("longitude") val longitude: Double,
    @SerializedName("profilePicture") val profilePicture: String? = null
)
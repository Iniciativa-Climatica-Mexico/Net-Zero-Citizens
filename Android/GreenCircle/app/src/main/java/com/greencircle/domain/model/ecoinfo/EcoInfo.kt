package com.greencircle.domain.model.ecoinfo

import com.google.gson.annotations.SerializedName
import java.util.Date
import java.util.UUID

/**
 * Modela la tabla de EcoInfo
 * @since 1.0.0
 *
 * @property ecoinfoId Identificador único de EcoInfo
 * @property postId Identificador único de Post
 * @property coverImageUrl URL de la imagen de portada
 * @property description Descripción de la EcoInfo
 * @property createdAt Fecha de creación
 * @property updatedAt Fecha de actualización
 */
data class EcoInfo(
    @SerializedName("ecoinfoId") val ecoinfoId: UUID,
    @SerializedName("postId") val postId: String,
    @SerializedName("postLink") val postUrl: String,
    @SerializedName("coverImage") val coverImageUrl: String? = null,
    @SerializedName("description") val description: String? = null,
    @SerializedName("createdAt") val createdAt: Date,
    @SerializedName("updatedAt") val updatedAt: Date
)

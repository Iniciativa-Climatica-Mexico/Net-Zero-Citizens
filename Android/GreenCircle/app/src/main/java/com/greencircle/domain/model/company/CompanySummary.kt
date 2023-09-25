package com.greencircle.domain.model.company

import com.google.gson.annotations.SerializedName
import java.util.UUID

/**
 * Esta clase se utiliza para almacenar los datos de resumen de la empresa
 * @property companyId: UUID de la empresa
 * @property name: Nombre de la empresa
 * @property city: Ciudad de la empresa
 * @property state: Estado donde se encuentra la empresa
 * @property rating: Calificación de la empresa
 * @property profilePicture: Imagen de perfil de la empresa
 */
data class CompanySummary(
    val companyId: UUID,
    val name: String,
    val city: String,
    val state: String,
    @SerializedName("score") val rating: Float,
    val profilePicture: String? = null
)

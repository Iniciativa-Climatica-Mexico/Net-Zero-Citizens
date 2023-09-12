/**
 * @file Companies.kt
 * @brief Modelo de datos de la tabla Companies
 * @author Carlos Salguero
 * @date 2023-09-05
 * @version 0.0.1
 *
 * @copyright Copyright (c) - AGPL-3.0 License
 *
 */
package com.greencircle.domain.model

import com.google.gson.annotations.SerializedName
import java.sql.Timestamp
import java.util.UUID

/**
 * @dataclass Companies
 * @brief Modelo de datos de la tabla Companies
 * @since 0.0.1
 */
data class Companies(
    @SerializedName("companyId") val companyId: UUID,
    @SerializedName("userId") val userId: UUID,
    @SerializedName("name") val name: String,
    @SerializedName("description") val description: String,
    @SerializedName("email") val email: String,
    @SerializedName("phoneNumber") val phoneNumber: String,
    @SerializedName("webPage") val webPage: String? = null,
    @SerializedName("street") val street: String,
    @SerializedName("streetNumber") val streetNumber: Int,
    @SerializedName("city") val city: String,
    @SerializedName("state") val state: String,
    @SerializedName("zipCode") val zipCode: Int,
    @SerializedName("latitude") val latitude: Double,
    @SerializedName("longitude") val longitude: Double,
    @SerializedName("profilePicture") val profilePicture: String? = null,
    @SerializedName("pdfCurriculumUrl") val pdfCurriculumUrl: String,
    @SerializedName("pdfDicCdmxUrl") val pdfDicCdmxUrl: String? = null,
    @SerializedName("pdfPeeFideUrl") val pdfPeeFideUrl: String? = null,
    @SerializedName("pdfGuaranteeSecurityUrl") val pdfGuaranteeSecurityUrl: String,
    @SerializedName("pdfActaConstitutivaUrl") val pdfActaConstituyentesUrl: String,
    @SerializedName("pdfIneUrl") val pdfIneUrl: String,
    @SerializedName("status") val status: Status,
    @SerializedName("createdAt") val createdAt: Timestamp,
    @SerializedName("updatedAt") val updatedAt: Timestamp,
)
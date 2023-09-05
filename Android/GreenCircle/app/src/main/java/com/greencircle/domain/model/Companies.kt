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

/**
 * @dataclass Companies
 * @brief Modelo de datos de la tabla Companies
 * @since 0.0.1
 */
data class Companies(
    @SerializedName("companyId") val companyId: Int,
    @SerializedName("userId") val userId: Int,
    @SerializedName("name") val name: String,
    @SerializedName("description") val description: String,
    @SerializedName("email") val email: String,
    @SerializedName("location") val location: String,
    @SerializedName("profile_picture") val profilePicture: String? = null,
    @SerializedName("status") val status: Status,
    @SerializedName("phoneNumber") val phoneNumber: String,
    @SerializedName("webPage") val website: String? = null,
    @SerializedName("createdAt") val createdAt: Timestamp,
    @SerializedName("updatedAt") val updatedAt: Timestamp
)

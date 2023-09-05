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
    @SerializedName("company_id") val companyId: Int,
    @SerializedName("user_id") val userId: Int,
    @SerializedName("name") val name: String,
    @SerializedName("description") val description: String,
    @SerializedName("email") val email: String,
    @SerializedName("location") val location: String,
    @SerializedName("profile_picture") val profilePicture: String? = null,
    @SerializedName("status") val status: Status,
    @SerializedName("phone_number") val phoneNumber: String,
    @SerializedName("web_page") val website: String? = null,
    @SerializedName("created_at") val createdAt: Timestamp,
    @SerializedName("updated_at") val updatedAt: Timestamp
)

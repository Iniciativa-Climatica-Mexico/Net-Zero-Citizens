/**
 * @file Status.kt
 * @brief Enum de los estados de la empresa
 * @author Carlos Salguero
 * @date 2021-09-05
 * @version 0.0.1
 *
 * @copyright Copyright (c) - AGPL-3.0 License
 */
package com.greencircle.domain.model

import com.google.gson.annotations.SerializedName

/**
 * @enum Status
 * @brief Enumerador de los estados de la empresa
 * @since 0.0.1
 */
enum class Status {
    @SerializedName("approved")
    APPROVED,

    @SerializedName("pending")
    PENDING_APPROVAL,

    @SerializedName("rejected")
    REJECTED
}
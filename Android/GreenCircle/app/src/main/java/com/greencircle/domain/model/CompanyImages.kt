package com.greencircle.domain.model

import com.google.gson.annotations.SerializedName
import java.io.Serializable
import java.util.UUID

/**
 * Represents the COMPANY_IMAGES table
 * @since 0.0.1
 *
 * @property companyImageId Unique identifier for the company image
 * @property companyId Identifier of the associated company
 * @property imageUrl URL of the image
 * @property altText Alternative text for the image
 * @property company Associated company
 */
data class CompanyImages(
    @SerializedName("companyImageId") val companyImageId: UUID,
    @SerializedName("companyId") val companyId: UUID,
    @SerializedName("imageUrl") val imageUrl: String? = null,
    @SerializedName("altText") val altText: String? = null
) : Serializable

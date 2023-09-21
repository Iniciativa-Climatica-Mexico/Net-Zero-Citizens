package com.greencircle.domain.model

import com.google.gson.annotations.SerializedName
import java.util.UUID

/**
 * Modelo que representa la tabla COMPANY_PRODUCTS
 * @since 0.0.1
 *
 * @property companyProductId Identificador único de la relación empresa-producto
 * @property productId Identificador único del producto
 * @property companyId Identificador único de la empresa
 * @property pdfProductCertificationUrl URL del PDF de certificación del producto
 * @property company Referencia al objeto de la empresa
 * @property product Referencia al objeto del producto
 */
data class CompanyProducts(
    @SerializedName("companyProductId") val companyProductId: UUID,
    @SerializedName("productId") val productId: UUID,
    @SerializedName("companyId") val companyId: UUID,
    @SerializedName("pdfProductCertificationUrl") val pdfProductCertificationUrl: String,
    @SerializedName("company") val company: Companies,
    @SerializedName("product") val product: Product
)
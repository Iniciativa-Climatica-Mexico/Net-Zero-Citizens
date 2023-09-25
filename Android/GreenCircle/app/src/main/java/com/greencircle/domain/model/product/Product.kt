package com.greencircle.domain.model.product

import com.google.gson.annotations.SerializedName
import java.io.Serializable
import java.util.UUID

/**
 * Modela la tabla Productos
 * @since 0.0.1
 *
 * @property productId Identificador único del producto
 * @property name Nombre del producto
 * @property description Descripción del producto
 * @property imageUrl URL de la imagen del producto
 * @property imageAltText Texto alternativo de la imagen del producto
 * @property companies Lista de empresas que ofrecen el producto
 */
data class Product(
    @SerializedName("productId") val productId: UUID,
    @SerializedName("name") val name: String,
    @SerializedName("description") val description: String? = null,
    @SerializedName("imageUrl") val imageUrl: String,
    @SerializedName("imageAltText") val imageAltText: String,
) : Serializable

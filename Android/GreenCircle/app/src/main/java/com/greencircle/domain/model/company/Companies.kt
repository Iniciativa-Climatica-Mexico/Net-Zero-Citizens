package com.greencircle.domain.model.company

import com.google.gson.annotations.SerializedName
import com.greencircle.domain.model.company.files.CompanyFile
import com.greencircle.domain.model.product.Product
import com.greencircle.domain.model.status.Status
import java.io.Serializable
import java.sql.Timestamp
import java.util.UUID

/**
 * Modelo de datos de la tabla Companies
 * @since 0.0.1
 *
 * @property companyId Identificador único de la empresa
 * @property userId Identificador único del usuario
 * @property name Nombre de la empresa
 * @property description Descripción de la empresa
 * @property email Correo electrónico de la empresa
 * @property phoneNumber Número telefónico de la empresa
 * @property webPage Página web de la empresa
 * @property street Calle de la empresa
 * @property streetNumber Número de la calle de la empresa
 * @property city Ciudad de la empresa
 * @property state Estado de la empresa
 * @property zipCode Código postal de la empresa
 * @property latitude Latitud de la empresa
 * @property longitude Longitud de la empresa
 * @property files Lista de archivos de la empresa
 * @property status Estatus de la empresa
 * @property createdAt Fecha de creación de la empresa
 * @property updatedAt Fecha de actualización de la empresa
 */
data class Companies(
    @SerializedName("companyId") val companyId: UUID,
    @SerializedName("userId") val userId: UUID,
    @SerializedName("name") val name: String,
    @SerializedName("description") val description: String,
    @SerializedName("email") val email: String,
    @SerializedName("phone") val phone: String,
    @SerializedName("webPage") val webPage: String? = null,
    @SerializedName("street") val street: String,
    @SerializedName("streetNumber") val streetNumber: String,
    @SerializedName("city") val city: String,
    @SerializedName("state") val state: String,
    @SerializedName("zipCode") val zipCode: Int,
    @SerializedName("latitude") val latitude: Double,
    @SerializedName("longitude") val longitude: Double,
    @SerializedName("files") val files: List<CompanyFile>,
    @SerializedName("status") val status: Status,
    @SerializedName("createdAt") val createdAt: Timestamp,
    @SerializedName("updatedAt") val updatedAt: Timestamp,
    @SerializedName("products") val products: ArrayList<Product>? = arrayListOf(),
    @SerializedName("images") val companyImages: List<CompanyImages>? = listOf(),
    @SerializedName("score") val rating: Float? = null,
    @SerializedName("oneComment") val oneComment: String? = null,
) : Serializable
package com.greencircle.domain.model.company.files

import com.google.gson.annotations.SerializedName

/**
 * @enum FileDescription
 * @brief Enumerador de las descripciones de los archivos de la empresa
 * @since 0.0.1
 */
enum class FileDescription {
    @SerializedName("INE representante legal")
    INE_REPRESENTANTE_LEGAL,
    @SerializedName("Acta constitutiva")
    ACTA_CONSTITUTIVA,
    @SerializedName("Curriculum")
    CURRICULUM,
    @SerializedName("Directorio de instaladores certificados de CDMX")
    DIRECTORIO_DE_INSTALADORES_CERTIFICADOS_DE_CDMX,
    @SerializedName("Padron de empresas especializadas FIDE")
    PADRON_DE_EMPRESAS_ESPECIALIZADAS_FIDE,
    @SerializedName("Certificaciones sistemas fotovoltaicos")
    CERTIFICACIONES_SISTEMAS_FOTOVOLTAICOS,
    @SerializedName("NOM-027-ENER/SCH-2018")
    NOM_027_ENER_SCH_2018,
    @SerializedName("NMX-ES-004-NORMEX-2015")
    NMX_ES_004_NORMEX_2015,
    @SerializedName("Archivos presion mayor a 294k Pa")
    ARCHIVOS_PRESION_MAYOR_A_294K_PA,
    @SerializedName("Archivos presion menor a 294k Pa")
    ARCHIVOS_PRESION_MENOR_A_294K_PA,
    @SerializedName("Carta de compromiso")
    CARTA_DE_COMPROMISO,
    @SerializedName("Imagen")
    IMAGEN,
    @SerializedName("Otro")
    OTRO
}
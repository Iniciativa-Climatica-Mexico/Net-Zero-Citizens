package com.greencircle.domain.model.company.files

import com.google.gson.annotations.SerializedName

enum class FileFormat {
    @SerializedName(".jpg") JPG,
    @SerializedName(".jpeg") JPEG,
    @SerializedName(".png") PNG,
    @SerializedName(".pdf") PDF,
    @SerializedName(".docx") DOCX,
    @SerializedName(".xlsx") XLSX,
    @SerializedName(".pptx") PPTX
}
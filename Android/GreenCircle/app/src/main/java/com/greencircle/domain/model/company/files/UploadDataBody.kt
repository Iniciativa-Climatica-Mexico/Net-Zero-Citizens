package com.greencircle.domain.model.company.files

import com.google.gson.annotations.SerializedName

data class UploadDataBody(
    @SerializedName("companyId") val companyId: String,
    @SerializedName("fileDescription") val fileDescription: String,
    @SerializedName("fileFormat") val fileFormat: String
)

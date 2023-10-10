package com.greencircle.domain.model.company.files

import com.google.gson.annotations.SerializedName
import java.util.UUID

data class CompanyFile(
    @SerializedName("companyFileId") val companyFileId: UUID,
    @SerializedName("companyId") val companyId: UUID,
    @SerializedName("fileUrl") val fileURL: String,
    @SerializedName("fileDescription") val fileDescription: FileDescription,
    @SerializedName("fileFormat") val fileFormat: FileFormat
)
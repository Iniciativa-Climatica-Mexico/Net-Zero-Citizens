package com.greencircle.domain.usecase.company

import com.greencircle.data.repository.CompanyFilesRepository
import java.io.File
import okhttp3.ResponseBody

class UploadCompanyFileRequirement {
    private val repository = CompanyFilesRepository()

    suspend operator fun invoke(
        authToken: String,
        file: File,
        companyId: String,
        fileDescription: String,
        fileFormat: String
    ): ResponseBody {
        try {
            return repository.uploadFile(authToken, file, companyId, fileDescription, fileFormat)
        } catch (e: Exception) {
            throw e
        }
    }
}
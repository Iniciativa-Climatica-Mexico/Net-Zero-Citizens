package com.greencircle.domain.usecase.company

import com.greencircle.data.repository.CompanyFilesRepository
import java.io.File
import okhttp3.ResponseBody

class UploadCompanyFileRequirement {
    private val repository = CompanyFilesRepository()

    suspend operator fun invoke(
        companyId: String,
        file: File,
        authToken: String
    ): ResponseBody {
        try {
            return repository.uploadFile(authToken, companyId, file)
        } catch (e: Exception) {
            throw e
        }
    }
}
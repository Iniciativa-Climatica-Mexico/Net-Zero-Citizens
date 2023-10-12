package com.greencircle.domain.usecase.company

import android.util.Log
import com.greencircle.data.repository.CompanyFilesRepository
import com.greencircle.domain.model.company.files.FileDescription
import com.greencircle.domain.model.company.files.FileFormat
import okhttp3.MultipartBody
import okhttp3.ResponseBody

class UploadCompanyFileRequirement {
    private val repository = CompanyFilesRepository()

    suspend operator fun invoke(
        authToken: String,
        filePart: MultipartBody.Part,
        companyId: String,
        fileDescription: FileDescription,
        fileFormat: FileFormat
    ): ResponseBody {
        try {
            return repository.uploadFile(
                authToken,
                filePart,
                companyId,
                fileDescription,
                fileFormat
            )
        } catch (e: Exception) {
            Log.e("CompanyFilesRepository", "uploadFile: ${e.message}")
            throw e
        }
    }
}
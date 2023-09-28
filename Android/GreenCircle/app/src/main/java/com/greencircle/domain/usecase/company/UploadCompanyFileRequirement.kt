package com.greencircle.domain.usecase.company

import android.util.Log
import com.greencircle.data.repository.CompanyFilesRepository
import okhttp3.MultipartBody

class UploadCompanyFileRequirement {
    private val repository = CompanyFilesRepository()

    suspend operator fun invoke(
        companyId: String,
        file: MultipartBody.Part,
        authToken: String
    ): String? {
        try {
            return repository.uploadFile(authToken, companyId, file)
        } catch (e: Exception) {
            return null
        }
    }
}
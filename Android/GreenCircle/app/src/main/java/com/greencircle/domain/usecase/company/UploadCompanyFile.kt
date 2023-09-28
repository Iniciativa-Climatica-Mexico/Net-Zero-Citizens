package com.greencircle.domain.usecase.company

import com.greencircle.data.repository.CompanyFilesRepository
import okhttp3.MultipartBody

class UploadCompanyFile {
    private val repository = CompanyFilesRepository()

    suspend operator fun invoke(
        companyId: String,
        file: MultipartBody.Part,
        authToken: String
    ): String? =
        repository.uploadFile(authToken, companyId, file)
}
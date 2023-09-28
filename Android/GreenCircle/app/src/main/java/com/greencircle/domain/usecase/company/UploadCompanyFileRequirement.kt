package com.greencircle.domain.usecase.company

import com.greencircle.data.repository.CompanyFilesRepository
import okhttp3.MultipartBody
import retrofit2.Call

class UploadCompanyFileRequirement {
    private val repository = CompanyFilesRepository()

    suspend operator fun invoke(
        companyId: String,
        file: MultipartBody.Part,
        authToken: String
    ): Call<Void>? {
        try {
            return repository.uploadFile(authToken, companyId, file)
        } catch (e: Exception) {
            return null
        }
    }
}
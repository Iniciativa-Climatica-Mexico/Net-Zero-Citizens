package com.greencircle.data.repository

import com.greencircle.data.remote.company.files.CompanyFilesAPIClient
import okhttp3.MultipartBody

class CompanyFilesRepository {
    private val api = CompanyFilesAPIClient()

    suspend fun uploadFile(
        authToken: String,
        companyId: String,
        file: MultipartBody.Part
    ): String? {
        return api.uploadFile(authToken, companyId, file)
    }
}
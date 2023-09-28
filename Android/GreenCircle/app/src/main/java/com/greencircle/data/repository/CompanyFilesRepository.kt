package com.greencircle.data.repository

import com.greencircle.data.remote.company.files.CompanyFilesAPIClient
import java.io.File
import okhttp3.ResponseBody

class CompanyFilesRepository {
    private val api = CompanyFilesAPIClient()

    suspend fun uploadFile(
        authToken: String,
        companyId: String,
        file: File
    ): ResponseBody {
        try {
            return api.uploadFile(authToken, companyId, file)
        } catch (e: Exception) {
            throw e
        }
    }
}
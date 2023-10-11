package com.greencircle.data.repository

import android.util.Log
import com.greencircle.data.remote.company.files.CompanyFilesAPIClient
import com.greencircle.domain.model.company.files.FileDescription
import com.greencircle.domain.model.company.files.FileFormat
import okhttp3.MultipartBody
import okhttp3.ResponseBody

class CompanyFilesRepository {
    private val api = CompanyFilesAPIClient()

    suspend fun uploadFile(
        authToken: String,
        filePart: MultipartBody.Part,
        companyId: String,
        fileDescription: FileDescription,
        fileFormat: FileFormat
    ): ResponseBody {
        try {
            return api.uploadFile(authToken, filePart, companyId, fileDescription, fileFormat)
        } catch (e: Exception) {
            Log.e("CompanyFilesRepository", "uploadFile: ${e.message}")
            throw e
        }
    }
}
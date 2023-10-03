package com.greencircle.data.repository

import android.util.Log
import com.greencircle.data.remote.company.files.CompanyFilesAPIClient
import java.io.File
import okhttp3.ResponseBody

class CompanyFilesRepository {
    private val api = CompanyFilesAPIClient()

    suspend fun uploadFile(
        authToken: String,
        file: File,
        companyId: String,
        fileDescription: String,
        fileFormat: String
    ): ResponseBody {
        try {
            return api.uploadFile(authToken, file, companyId, fileDescription, fileFormat)
        } catch (e: Exception) {
            Log.e("CompanyFilesRepository", "uploadFile: ${e.message}")
            throw e
        }
    }
}
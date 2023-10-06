package com.greencircle.data.remote.company.files

import android.util.Log
import com.greencircle.data.remote.NetworkModel
import com.greencircle.domain.model.company.files.FileDescription
import com.greencircle.domain.model.company.files.FileFormat
import okhttp3.MultipartBody
import okhttp3.ResponseBody

class CompanyFilesAPIClient {
    private lateinit var api: CompanyFilesAPIService

    suspend fun uploadFile(
        authToken: String,
        filePart: MultipartBody.Part,
        companyId: String,
        fileDescription: FileDescription,
        fileFormat: FileFormat
    ): ResponseBody {
        api = NetworkModel(authToken, CompanyFilesAPIService::class.java)

        return try {
            Log.d("FILEPART", filePart.toString())
            val response = api.uploadFile(filePart, companyId, fileDescription, fileFormat)
            Log.w("CompanyFilesAPIClient", "uploadFile: ${response.string()}")
            return response
        } catch (e: Exception) {
            Log.e("CompanyFilesAPIClient", "uploadFile: ${e.message}")
            throw e
        }
    }
}
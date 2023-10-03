package com.greencircle.data.remote.company.files

import android.util.Log
import com.greencircle.data.remote.NetworkModel
import java.io.File
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.MultipartBody
import okhttp3.RequestBody.Companion.asRequestBody
import okhttp3.ResponseBody

class CompanyFilesAPIClient {
    private lateinit var api: CompanyFilesAPIService

    suspend fun uploadFile(
        authToken: String,
        file: File,
        companyId: String,
        fileDescription: String,
        fileFormat: String
    ): ResponseBody {
        val reqFile = file.asRequestBody("multipart/form-data".toMediaTypeOrNull())
        val filePart = MultipartBody.Part.createFormData("file", file.name, reqFile)
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
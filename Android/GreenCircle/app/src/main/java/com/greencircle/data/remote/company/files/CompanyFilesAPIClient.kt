package com.greencircle.data.remote.company.files

import com.greencircle.data.remote.NetworkModel
import okhttp3.MultipartBody

class CompanyFilesAPIClient {
    private lateinit var api: CompanyFilesAPIService

    suspend fun uploadFile(authToken: String, companyId: String, file : MultipartBody.Part): String? {
        api = NetworkModel(authToken, CompanyFilesAPIService::class.java)
        return try {
            api.uploadFile(companyId, file)
        } catch (e: Exception) {
            e.printStackTrace()
            ""
        }
    }
}
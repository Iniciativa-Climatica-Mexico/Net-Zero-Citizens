package com.greencircle.data.repository

import com.greencircle.data.remote.company.CompanyAPIClient
import com.greencircle.data.remote.company.files.CompanyFilesAPIClient
import okhttp3.MultipartBody
import java.io.File

class CompanyFilesRepository {
    private val api = CompanyFilesAPIClient()

    suspend fun uploadFile(authToken: String, idCompany: String, file: MultipartBody.Part): String? {
        return api.uploadFile(authToken, idCompany, file)
    }
}
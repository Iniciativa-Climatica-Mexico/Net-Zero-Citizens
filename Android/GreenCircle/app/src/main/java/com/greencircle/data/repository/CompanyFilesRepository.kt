package com.greencircle.data.repository

import android.util.Log
import com.greencircle.data.remote.company.files.CompanyFilesAPIClient
import okhttp3.MultipartBody
import retrofit2.Call

class CompanyFilesRepository {
    private val api = CompanyFilesAPIClient()

    suspend fun uploadFile(
        authToken: String,
        companyId: String,
        file: MultipartBody.Part
    ): Call<Void>? {
        try {
            Log.d("FILE", file.toString())
            return api.uploadFile(authToken, companyId, file)
        } catch (e: Exception) {
            Log.d("NOPE2", e.toString())
            return null
        }
    }
}
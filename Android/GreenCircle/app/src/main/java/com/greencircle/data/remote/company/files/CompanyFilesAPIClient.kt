package com.greencircle.data.remote.company.files

import android.util.Log
import com.greencircle.data.remote.NetworkModel
import okhttp3.MultipartBody
import retrofit2.Call

class CompanyFilesAPIClient {
    private lateinit var api: CompanyFilesAPIService

    suspend fun uploadFile(
        authToken: String,
        companyId: String,
        file: MultipartBody.Part
    ): Call<Void>? {
        api = NetworkModel(authToken, CompanyFilesAPIService::class.java)
        return try {
            return api.uploadFile(companyId, file)
        } catch (e: Exception) {
            Log.d("NOPE", e.toString())
            return null
        }
    }
}
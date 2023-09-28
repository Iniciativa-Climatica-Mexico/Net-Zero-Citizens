package com.greencircle.data.remote.company.files

import okhttp3.MultipartBody
import retrofit2.Call
import retrofit2.http.Multipart
import retrofit2.http.POST
import retrofit2.http.Part
import retrofit2.http.Path

/**
 * Interfaz que define los métodos para realizar operaciones relacionadas con Documentos de empresas a través de una API.
 */

interface CompanyFilesAPIService {
    @Multipart
    @POST("company/{companyId}/upload/file")
    suspend fun uploadFile(
        @Path("companyId") companyId: String,
        @Part file: MultipartBody.Part
    ): Call<Void>
}
package com.greencircle.data.remote.company.files

import okhttp3.MultipartBody
import retrofit2.http.Body
import retrofit2.http.POST
import retrofit2.http.Path

/**
 * Interfaz que define los métodos para realizar operaciones relacionadas con Documentos de empresas a través de una API.
 */

interface CompanyFilesAPIService {
    @POST("company/{companyId}/upload/file")
    suspend fun uploadFile(
        @Path("companyId") companyId: String,
        @Body file: MultipartBody.Part,
    ): String
}
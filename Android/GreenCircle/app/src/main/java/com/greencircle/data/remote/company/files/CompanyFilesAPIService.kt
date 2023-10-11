package com.greencircle.data.remote.company.files

import com.greencircle.domain.model.company.files.FileDescription
import com.greencircle.domain.model.company.files.FileFormat
import okhttp3.MultipartBody
import okhttp3.ResponseBody
import retrofit2.http.Multipart
import retrofit2.http.POST
import retrofit2.http.Part

/**
 * Interfaz que define los métodos para realizar operaciones relacionadas con Documentos de empresas a través de una API.
 */

interface CompanyFilesAPIService {
    @Multipart
    @POST("company/upload/file")
    suspend fun uploadFile(
        @Part file: MultipartBody.Part,
        @Part("companyId") companyId: String,
        @Part("fileDescription") fileDescription: FileDescription,
        @Part("fileFormat") fileFormat: FileFormat
    ): ResponseBody

    // FILE, COMPANYID, FILEDES CRIPTION, FILE FORMAT
}
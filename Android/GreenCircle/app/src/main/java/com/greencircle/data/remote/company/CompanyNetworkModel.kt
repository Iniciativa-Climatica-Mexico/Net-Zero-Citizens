package com.greencircle.data.remote.company

import com.greencircle.data.remote.auth.AuthInterceptor
import com.greencircle.utils.Constants
import okhttp3.OkHttpClient
import retrofit2.converter.gson.GsonConverterFactory

/**
 * Modelo de red para interactuar con la API de empresa.
 *
 * Este objeto proporciona una instancia de [CompanyAPIService] configurada para comunicarse
 * con la API de empresa.
 */
object CompanyNetworkModel {
    private val gsonFactory: GsonConverterFactory = GsonConverterFactory.create()

    /**
     * Crea una instancia de [CompanyAPIService] configurada para interactuar con la API de empresa.
     *
     * @return Una instancia de [CompanyAPIService] lista para realizar llamadas a la API.
     */
    operator fun invoke(authToken: String): CompanyAPIService {
        val okHttpClient = OkHttpClient.Builder()
            .addInterceptor(AuthInterceptor(authToken))
            .build()

        return retrofit2.Retrofit.Builder()
            .baseUrl(Constants.SERVER_BASE_URL)
            .client(okHttpClient)
            .addConverterFactory(gsonFactory)
            .build()
            .create(CompanyAPIService::class.java)
    }
}

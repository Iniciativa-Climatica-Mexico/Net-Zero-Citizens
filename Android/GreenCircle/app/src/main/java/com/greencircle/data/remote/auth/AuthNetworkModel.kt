package com.greencircle.data.remote.auth

import com.greencircle.utils.Constants
import okhttp3.OkHttpClient
import retrofit2.converter.gson.GsonConverterFactory

/**
 * Modelo de red para interactuar con la API de Auth.
 *
 * Este objeto proporciona una instancia de [AuthAPIService] configurada para comunicarse
 * con la API de Auth.
 */
object AuthNetworkModel {
    private val okHttpClient: OkHttpClient = OkHttpClient()
    private val gsonFactory: GsonConverterFactory = GsonConverterFactory.create()

    /**
     * Crea una instancia de [AuthAPIService] configurada para interactuar con la API de Auth.
     *
     * @return Una instancia de [AuthAPIService] lista para realizar llamadas a la API.
     */
    operator fun invoke(): AuthAPIService {
        return (
            retrofit2.Retrofit.Builder()
                .baseUrl(Constants.SERVER_BASE_URL)
                .client(okHttpClient)
                .addConverterFactory(gsonFactory)
                .build()
                .create(AuthAPIService::class.java)
            )
    }
}
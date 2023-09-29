package com.greencircle.data.remote

import com.greencircle.data.remote.auth.AuthInterceptor
import com.greencircle.utils.Constants
import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

/**
 * Modelo de red genérico para interactuar con servicios API.
 *
 * Este objeto proporciona una manera de crear instancias de servicios API configuradas para comunicarse con diversas APIs.
 */
object NetworkModel {
    private val gsonFactory: GsonConverterFactory = GsonConverterFactory.create()

    /**
     * Crea una instancia de un servicio API configurada para una API específica.
     *
     * @param authToken El token de autenticación que se utilizará para las solicitudes API.
     * @param apiServiceClass La clase de la interfaz del servicio API.
     * @return Una instancia del servicio API especificado.
     */
    operator fun <T> invoke(authToken: String, apiServiceClass: Class<T>): T {
        val okHttpClient = OkHttpClient.Builder()
            .addInterceptor(AuthInterceptor(authToken))
            .build()

        return Retrofit.Builder()
            .baseUrl(Constants.SERVER_BASE_URL)
            .client(okHttpClient)
            .addConverterFactory(gsonFactory)
            .build()
            .create(apiServiceClass)
    }
}

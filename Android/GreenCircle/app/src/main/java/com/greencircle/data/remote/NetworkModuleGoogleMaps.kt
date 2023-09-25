package com.greencircle.data.remote

import com.greencircle.utils.Constants
import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

/**
 * Modelo de red para interactuar con la API de Google Maps
 *
 * Este objeto proporciona una instancia de [GoogleMapsAPIService] configurada para comunicarse
 * con la API de Google Maps
 */
object NetworkModuleGoogleMaps {
    private val gsonFactory: GsonConverterFactory = GsonConverterFactory.create()
    private val okHttpClient: OkHttpClient = OkHttpClient()

    operator fun invoke(): GoogleMapsAPIService {
        return Retrofit.Builder()
            .baseUrl(Constants.SERVER_BASE_URL)
            .client(okHttpClient)
            .addConverterFactory(gsonFactory)
            .build()
            .create(GoogleMapsAPIService::class.java)
    }
}
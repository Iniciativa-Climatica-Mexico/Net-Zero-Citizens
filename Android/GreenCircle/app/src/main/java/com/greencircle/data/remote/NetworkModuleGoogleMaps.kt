package com.greencircle.data.remote

import com.greencircle.utils.Constants
import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

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
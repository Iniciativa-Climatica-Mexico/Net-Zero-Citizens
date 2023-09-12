package com.greencircle.data.remote

import com.greencircle.utils.Constants
import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object ReviewNetworkModuleDI {
    private val gsonFactory: GsonConverterFactory = GsonConverterFactory.create()
    private val okHttpClient: OkHttpClient = OkHttpClient()

    operator fun invoke(): ReviewAPIService {
        return Retrofit.Builder()
            .baseUrl(Constants.BASE_URL)
            .addConverterFactory(gsonFactory)
            .client(okHttpClient)
            .build()
            .create(ReviewAPIService::class.java)
    }
}
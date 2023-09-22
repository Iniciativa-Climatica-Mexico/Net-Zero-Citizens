package com.greencircle.data.remote.reviews

import com.greencircle.utils.Constants
import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object ReviewNetworkModuleDI {
    private val gsonFactory: GsonConverterFactory = GsonConverterFactory.create()
    private val okHttpClient: OkHttpClient = OkHttpClient()

    operator fun invoke(): ReviewAPIService {
        return Retrofit.Builder()
            .baseUrl(Constants.SERVER_BASE_URL)
            .client(okHttpClient)
            .addConverterFactory(gsonFactory)
            .build()
            .create(ReviewAPIService::class.java)
    }
}
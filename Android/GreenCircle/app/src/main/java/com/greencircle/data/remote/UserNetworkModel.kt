package com.greencircle.data.remote

import com.greencircle.utils.Constants
import okhttp3.OkHttpClient
import retrofit2.converter.gson.GsonConverterFactory

object UserNetworkModel {
    private val gsonFactory: GsonConverterFactory = GsonConverterFactory.create()

    operator fun invoke(): UserAPIService {
        val okHttpClient = OkHttpClient.Builder().build()

        return retrofit2.Retrofit.Builder()
            .baseUrl(Constants.SERVER_BASE_URL)
            .client(okHttpClient)
            .addConverterFactory(gsonFactory)
            .build()
            .create(UserAPIService::class.java)
    }
}

package com.greencircle.data.remote

import com.greencircle.utils.Constants
import okhttp3.OkHttpClient
import retrofit2.converter.gson.GsonConverterFactory

object CompanyNetworkModel {
    private val okHttpClient: OkHttpClient = OkHttpClient()
    private val gsonFactory: GsonConverterFactory = GsonConverterFactory.create()

    operator fun invoke(): CompanyAPIService {
        return (
            retrofit2.Retrofit.Builder()
                .baseUrl(Constants.SERVER_BASE_URL)
                .client(okHttpClient)
                .addConverterFactory(gsonFactory)
                .build()
                .create(CompanyAPIService::class.java)
            )
    }
}
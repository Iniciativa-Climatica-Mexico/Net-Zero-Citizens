package com.greencircle.data.remote

import com.greencircle.utils.Constants
import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object CompanyNetworkModuleDI {
    private val gsonFactory = GsonConverterFactory.create()
    private val okHttpClient = OkHttpClient()

    operator fun invoke(): CompanyAPIService {
        return Retrofit.Builder()
            .baseUrl(Constants.BASE_URL)
            .client(okHttpClient)
            .addConverterFactory(gsonFactory)
            .build()
            .create(CompanyAPIService::class.java)
    }
}
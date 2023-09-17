package com.greencircle.data.remote

import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object SurveyNetworkModuleDI {
    private val gsonFactory: GsonConverterFactory = GsonConverterFactory.create()
    private val okHttpClient: OkHttpClient = OkHttpClient()

    operator fun invoke(): SurveyAPIService {
        val baseUrl = "http://10.0.2.2:5050/api/v1/survey/"
        val baseUrl2 = "http://10.25.122.19:5050/api/v1/survey/"
        return Retrofit.Builder().baseUrl(baseUrl)
            .addConverterFactory(gsonFactory).client(okHttpClient).build()
            .create(SurveyAPIService::class.java)
    }
}

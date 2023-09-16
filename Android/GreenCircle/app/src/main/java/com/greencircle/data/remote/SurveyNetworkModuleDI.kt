package com.greencircle.data.remote

import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object SurveyNetworkModuleDI {
    private val gsonFactory: GsonConverterFactory = GsonConverterFactory.create()
    private val okHttpClient: OkHttpClient = OkHttpClient()

    operator fun invoke(): SurveyAPIService {
        return Retrofit.Builder().baseUrl("http://localhost:3000/api/v1/survey/")
            .addConverterFactory(gsonFactory).client(okHttpClient).build()
            .create(SurveyAPIService::class.java)
    }
}

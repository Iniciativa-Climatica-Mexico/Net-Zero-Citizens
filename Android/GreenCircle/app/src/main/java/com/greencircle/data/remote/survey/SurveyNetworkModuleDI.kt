package com.greencircle.data.remote.survey

import com.greencircle.utils.Constants
import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object SurveyNetworkModuleDI {
    private val gsonFactory: GsonConverterFactory = GsonConverterFactory.create()
    private val okHttpClient: OkHttpClient = OkHttpClient()

    operator fun invoke(): SurveyAPIService {
        val baseUrl = Constants.SERVER_BASE_URL + "survey/"
        return Retrofit.Builder().baseUrl(baseUrl)
            .addConverterFactory(gsonFactory).client(okHttpClient).build()
            .create(SurveyAPIService::class.java)
    }
}

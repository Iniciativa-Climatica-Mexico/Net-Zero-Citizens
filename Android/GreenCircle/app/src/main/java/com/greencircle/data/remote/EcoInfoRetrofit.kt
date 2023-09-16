package com.greencircle.data.remote

import com.greencircle.utils.Constants
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object EcoInfoRetrofit {
    private val retrofit by lazy {
        Retrofit.Builder()
            .baseUrl(Constants.ECO_INFO_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
    }

    val api: EcoInfoAPI by lazy {
        retrofit.create(EcoInfoAPI::class.java)
    }
}
package com.greencircle.data.remote.ecoinfo

import com.greencircle.utils.Constants
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object EcoInfoRetrofit {
    private val retrofit by lazy {
        Retrofit.Builder().baseUrl(Constants.SERVER_BASE_URL)
            .addConverterFactory(GsonConverterFactory.create()).build()
    }

    val api: EcoInfoAPI by lazy {
        retrofit.create(EcoInfoAPI::class.java)
    }
}
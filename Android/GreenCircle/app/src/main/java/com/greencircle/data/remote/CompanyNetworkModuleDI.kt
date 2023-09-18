package com.greencircle.data.remote

import com.greencircle.utils.Constants
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object CompanyNetworkModuleDI {
    private val gsonFactory = GsonConverterFactory.create()

    operator fun invoke(): CompanyAPIService {
        return Retrofit.Builder()
            .baseUrl(Constants.BASE_URL)
            .addConverterFactory(gsonFactory)
            .build()
            .create(CompanyAPIService::class.java)
    }
}
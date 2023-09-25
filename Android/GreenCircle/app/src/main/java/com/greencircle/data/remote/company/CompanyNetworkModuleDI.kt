package com.greencircle.data.remote.company

import com.greencircle.utils.Constants
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object CompanyNetworkModuleDI {
    private val gsonFactory = GsonConverterFactory.create()

    operator fun invoke(): CompanyAPIService {
        return Retrofit.Builder()
            .baseUrl(Constants.SERVER_BASE_URL)
            .addConverterFactory(gsonFactory)
            .build()
            .create(CompanyAPIService::class.java)
    }
}
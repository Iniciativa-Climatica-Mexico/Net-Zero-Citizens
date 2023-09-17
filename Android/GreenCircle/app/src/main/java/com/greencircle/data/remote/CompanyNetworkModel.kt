package com.greencircle.data.remote

import AuthInterceptor
import com.greencircle.utils.Constants
import okhttp3.OkHttpClient
import retrofit2.converter.gson.GsonConverterFactory

object CompanyNetworkModel {
    private val gsonFactory: GsonConverterFactory = GsonConverterFactory.create()

    operator fun invoke(authToken: String): CompanyAPIService {
        val okHttpClient = OkHttpClient.Builder()
            .addInterceptor(AuthInterceptor(authToken))
            .build()

        return retrofit2.Retrofit.Builder()
            .baseUrl(Constants.SERVER_BASE_URL)
            .client(okHttpClient)
            .addConverterFactory(gsonFactory)
            .build()
            .create(CompanyAPIService::class.java)
    }
}

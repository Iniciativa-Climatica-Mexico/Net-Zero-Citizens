package com.greencircle.data.remote.complaints

import com.greencircle.data.remote.auth.AuthInterceptor
import com.greencircle.utils.Constants
import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
class ComplaintsRetrofit(private val authToken: String) {
    private val okHttpClient by lazy {
        OkHttpClient.Builder()
            .addInterceptor(AuthInterceptor(authToken))
            .build()
    }

    private val retrofit by lazy {
        Retrofit.Builder()
            .baseUrl(Constants.SERVER_BASE_URL)
            .client(okHttpClient)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
    }

    val api: ComplaintAPI by lazy {
        retrofit.create(ComplaintAPI::class.java)
    }
}
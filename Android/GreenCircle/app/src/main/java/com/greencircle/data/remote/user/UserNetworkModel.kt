package com.greencircle.data.remote.user

import com.greencircle.data.remote.auth.AuthInterceptor
import com.greencircle.utils.Constants
import okhttp3.OkHttpClient
import retrofit2.converter.gson.GsonConverterFactory

/**
 * Modelo de red para interactuar con la API de usuario.
 *
 * Este objeto proporciona una instancia de [UserAPIService] configurada para comunicarse con la API de usuario.
 */
object UserNetworkModel {
    private val gsonFactory: GsonConverterFactory = GsonConverterFactory.create()

    /**
     * Crea una instancia de [UserAPIService] configurada para interactuar con la API de usuario.
     *
     * @return Una instancia de [UserAPIService] lista para realizar llamadas a la API.
     */
    operator fun invoke(authToken: String): UserAPIService {
        val okHttpClient = OkHttpClient.Builder()
            .addInterceptor(AuthInterceptor(authToken))
            .build()

        return retrofit2.Retrofit.Builder()
            .baseUrl(Constants.SERVER_BASE_URL)
            .client(okHttpClient)
            .addConverterFactory(gsonFactory)
            .build()
            .create(UserAPIService::class.java)
    }
}

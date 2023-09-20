package com.greencircle.data.remote

import com.greencircle.domain.model.EcoInfo
import retrofit2.http.GET

interface EcoInfoAPI {
    @GET("ecoinfo/")
    suspend fun getEcoInfo(): List<EcoInfo>
}
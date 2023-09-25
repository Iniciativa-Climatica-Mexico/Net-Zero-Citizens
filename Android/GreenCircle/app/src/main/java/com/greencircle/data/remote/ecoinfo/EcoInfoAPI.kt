package com.greencircle.data.remote.ecoinfo

import com.greencircle.domain.model.ecoinfo.EcoInfo
import retrofit2.http.GET

interface EcoInfoAPI {
    @GET("ecoinfo/")
    suspend fun getEcoInfo(): List<EcoInfo>
}
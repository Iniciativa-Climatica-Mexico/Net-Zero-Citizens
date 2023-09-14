package com.greencircle.data.remote

import com.greencircle.domain.model.EcoInfo
import com.greencircle.utils.Constants
import retrofit2.http.GET

interface EcoInfoAPI {
    @GET(Constants.ECO_INFO_URL)
    suspend fun getEcoInfo(): List<EcoInfo>
}
package com.greencircle.data.repository

import com.greencircle.data.remote.EcoInfoAPI
import com.greencircle.domain.model.EcoInfo

class EcoInfoRepository(private val api: EcoInfoAPI) {
    suspend fun getEcoInfoFromApi(): List<EcoInfo> {
        return api.getEcoInfo()
    }
}
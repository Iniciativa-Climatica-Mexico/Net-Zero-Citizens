package com.greencircle.data.repository

import com.greencircle.data.remote.GoogleMapsAPIService
import com.greencircle.data.remote.NetworkModuleGoogleMaps
import com.greencircle.domain.model.CompanyObject

class GoogleMapsRepository() {
    private lateinit var api: GoogleMapsAPIService
    suspend fun getCompanyList(): CompanyObject? {
        api = NetworkModuleGoogleMaps()
        return try {
            api.getCompanyList()
        } catch (e: java.lang.Exception) {
            e.printStackTrace()
            null
        }
    }
}
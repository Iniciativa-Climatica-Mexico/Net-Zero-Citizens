package com.greencircle.data.remote

import com.greencircle.domain.model.CompanyObject
import retrofit2.http.GET

interface GoogleMapsAPIService {
    @GET("company/geocoding")
    suspend fun getCompanyList(): CompanyObject
}
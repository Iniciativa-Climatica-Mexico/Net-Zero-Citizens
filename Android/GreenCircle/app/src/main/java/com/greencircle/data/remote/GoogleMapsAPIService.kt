package com.greencircle.data.remote

import com.greencircle.domain.model.CompanyObject
import retrofit2.http.GET

/**
 * Interfaz que define el metodo para obtener el json con las
 * compañias ya aceptadas del backend
 */
interface GoogleMapsAPIService {
    @GET("company/geocoding")
    suspend fun getCompanyList(): CompanyObject
}
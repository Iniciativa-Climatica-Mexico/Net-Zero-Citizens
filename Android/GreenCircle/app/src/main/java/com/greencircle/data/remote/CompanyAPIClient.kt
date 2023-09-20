package com.greencircle.data.remote

import android.util.Log

/**
 * Cliente para realizar operaciones relacionadas con empresas a través de la API.
 */
class CompanyAPIClient {
    private lateinit var api: CompanyAPIService

    class CompanyAPIClient()

    /**
     * Crea una nueva empresa en la API.
     *
     * @param company Un objeto del modelo Company.
     * @param authToken El token del autentificación.
     * @return Un objeto [CompanyAPIService.CreateCompanyRequest] que contiene los datos de la nueva empresa.
     */
    suspend fun createCompany(
        company: CompanyAPIService.CreateCompanyRequest,
        authToken: String
    ): CompanyAPIService.CreateCompanyResponse? {
        // Inicializa el cliente de la API de empresa.
        api = CompanyNetworkModel(authToken)
        return try {
            // Realiza la creación de la empresa llamando al método en la API.
            val response = api.createCompany(company)
            Log.d("CompanyAPIClient", "Response: $response")
            response
        } catch (e: Exception) {
            // Maneja cualquier excepción que pueda ocurrir durante la creación.
            e.printStackTrace()
            Log.e("CreateCompany", "Error: $e")
            null
        }
    }
}
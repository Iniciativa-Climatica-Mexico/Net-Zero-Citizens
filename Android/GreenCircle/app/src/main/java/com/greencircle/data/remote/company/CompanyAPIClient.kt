package com.greencircle.data.remote.company

import com.greencircle.data.remote.NetworkModel
import com.greencircle.domain.model.company.Companies

/**
 * Cliente para realizar operaciones relacionadas con empresas a través de la API.
 */
class CompanyAPIClient {
    private lateinit var api: CompanyAPIService

    suspend fun getCompanyById(authToken: String, companyID: String): Companies? {
        api = NetworkModel(authToken, CompanyAPIService::class.java)
        return try {
            api.getCompany(companyID)
        } catch (e: java.lang.Exception) {
            e.printStackTrace()
            null
        }
    }

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
        api = NetworkModel(authToken, CompanyAPIService::class.java)
        return try {
            val response = api.createCompany(company)
            response
        } catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }
}
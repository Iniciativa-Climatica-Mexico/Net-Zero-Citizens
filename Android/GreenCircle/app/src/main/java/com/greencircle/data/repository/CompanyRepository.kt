package com.greencircle.data.repository

import com.greencircle.data.remote.CompanyAPIClient
import com.greencircle.data.remote.CompanyAPIService

/**
 * Repositorio para gestionar operaciones relacionadas con empresas.
 *
 * Este repositorio proporciona métodos para interactuar con la API de empresa y realizar operaciones
 * como la creación de nuevas empresas.
 */
class CompanyRepository {
    private val apiCompany = CompanyAPIClient()

    /**
     * Crea una nueva empresa en en la API.
     *
     * @param company Un objeto del modelo Company.
     * @param authToken El token del autentificación.
     * @return Un objeto [CompanyAPIService.CreateCompanyRequest] que contiene los datos de la nueva empresa.
     */
    suspend fun createCompany(
        company: CompanyAPIService.CreateCompanyRequest,
        authToken: String
    ): CompanyAPIService.CreateCompanyResponse? =
        apiCompany.createCompany(company, authToken)
}
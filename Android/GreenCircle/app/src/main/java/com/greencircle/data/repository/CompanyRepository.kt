package com.greencircle.data.repository

import com.greencircle.data.remote.company.CompanyAPIClient
import com.greencircle.data.remote.company.CompanyAPIService
import java.util.UUID

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

    /**
     * Asigna una empresa a un usuario en la API.
     *
     * @param authToken El token del autentificación.
     * @param userId El id del usuario a asignar.
     * @param companyID El id de la empresa a asignar.
     * @return Un mensaje de respuesta de la API.
     */
    suspend fun assignCompany(authToken: String, userId: UUID, companyId: UUID): String? {
        val res = apiCompany.assignCompany(authToken, userId, companyId)
        if (res != null && res.isSuccessful) {
            return res.body()?.message
        } else {
            return null
        }
    }

    suspend fun assignCompanyProducts(
        authToken: String,
        companyId: String,
        products: ArrayList<String>,
    ): Boolean {
        return apiCompany.assignCompanyProducts(authToken, companyId, products)

    }
}
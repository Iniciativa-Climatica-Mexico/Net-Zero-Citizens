package com.greencircle.data.remote.company

import com.greencircle.data.remote.NetworkModel
import com.greencircle.data.remote.company.CompanyAPIService.AssignCompanyRequestBody
import com.greencircle.data.remote.company.CompanyAPIService.AssignCompanyResponse
import com.greencircle.domain.model.company.Companies
import java.util.UUID
import retrofit2.Response

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

    /**
     * Asigna una empresa a un usuario en la API.
     *
     * @param authToken El token del autentificación.
     * @param userId El id del usuario a asignar.
     * @param companyID El id de la empresa a asignar.
     * @return Un objeto [AssignCompanyResponse] que puede contener el id de la nueva empresa.
     */
    suspend fun assignCompany(
        authToken: String,
        userId: UUID,
        companyID: UUID
    ): Response<AssignCompanyResponse>? {
        api = NetworkModel(authToken, CompanyAPIService::class.java)
        return try {
            val response = api.assignCompany(
                companyID,
                AssignCompanyRequestBody(
                    userId
                )
            )
            return response
        } catch (e: Exception) {
            e.printStackTrace()
            return null
        }
    }

    suspend fun assignCompanyProducts(
        authToken: String,
        companyId: String,
        products: ArrayList<String>
    ): Boolean {
        api = NetworkModel(authToken, CompanyAPIService::class.java)
        return try {
            val response = api.assignCompanyProducts(
                companyId,
                CompanyAPIService.AssignCompanyProductsRequestBody(
                    products
                )
            )
            return when {
                response.isSuccessful -> true
                else -> false
            }
        } catch (e: Exception) {
            e.printStackTrace()
            return false
        }
    }
}
package com.greencircle.data.remote

import com.greencircle.data.remote.models.Company
import retrofit2.http.Body
import retrofit2.http.POST

/**
 * Interfaz que define los métodos para realizar operaciones relacionadas con empresas a través de una API.
 */
interface CompanyAPIService {

    /**
     * Clase que representa la respuesta de la creación de una empresa.
     * Nota: Esta estructura viene del backend del método createCompany en el company.controller
     *
     * @property companyId El ID del la compañia a crear.
     * @property message Un mensaje informativo relacionado con la creación.
     * @property error Posible error en la creación de una empresa.
     */
    data class CreateCompanyResponse(
        val companyId: String?,
        val message: String?,
        val error: String?
    )

    /**
     * Clase que representa la solicitud de creación de una empresa.
     *
     * @property company Un objeto perteneciente a Company Model .
     */
    data class CreateCompanyRequest(
        val company: Company
    )

    /**
     * Crea una nueva empresa en la API.
     *
     * @param request La solicitud de creación que contiene los datos de la nueva empresa
     * @return Un objeto [CreateCompanyResponse] que puede contener el id de la nueva empresa,
     * un mensaje y un error.
     */
    @POST("company/create")
    suspend fun createCompany(@Body request: CreateCompanyRequest): CreateCompanyResponse
}
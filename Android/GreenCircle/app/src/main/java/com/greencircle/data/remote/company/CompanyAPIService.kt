package com.greencircle.data.remote.company

import com.greencircle.domain.model.company.Companies
import com.greencircle.domain.model.company.Company
import java.util.UUID
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.PUT
import retrofit2.http.Path

/**
 * Interfaz que define los métodos para realizar operaciones relacionadas con empresas a través de una API.
 */
interface CompanyAPIService {

    @GET("company/{id}")
    suspend fun getCompany(
        @Path("id") id: String
    ): Companies

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
    data class AssignCompanyRequestBody(
        val userId: UUID
    )

    data class AssignCompanyResponse(
        val message: String?,
    )

    /**
     * Asigna una empresa a un usuario en la API.
     *
     * @param body La solicitud de asignación de compañía a usuario
     * @return Un objeto [AssignCompanyResponse] que puede contener el id de la nueva empresa,
     * un mensaje y un error.
     */
    @PUT("company/{companyId}/assign")
    suspend fun assignCompany(
        @Path("companyId") companyId: UUID,
        @Body body: AssignCompanyRequestBody
    ): Response<AssignCompanyResponse>
}

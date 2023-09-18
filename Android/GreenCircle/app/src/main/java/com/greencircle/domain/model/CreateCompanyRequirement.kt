package com.greencircle.domain.model

import com.greencircle.data.remote.CompanyAPIService
import com.greencircle.data.repository.CompanyRepository

/**
 * Modelo para crear una nueva empresa.
 *
 * Este modelo proporciona un método para crear una nueva empresa utilizando el [CompanyRepository]
 * para interactuar con la API de usuario.
 */
class CreateCompanyRequirement {
    private val repository = CompanyRepository()

    /**
     * Crea una nueva empresa.
     *
     * @param company Un objeto del modelo Company.
     * @param authToken El token del autentificación.
     * @return Un objeto [CompanyAPIService.CreateCompanyResponse] que que puede contener
     * el id de la nueva empresa, un mensaje y un error.
     */
    suspend operator fun invoke(
        company: CompanyAPIService.CreateCompanyRequest,
        authToken: String
    ): CompanyAPIService.CreateCompanyResponse? =
        repository.createCompany(company, authToken)
}
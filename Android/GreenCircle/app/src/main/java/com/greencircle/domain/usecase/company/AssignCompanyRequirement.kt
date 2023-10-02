package com.greencircle.domain.usecase.company

import com.greencircle.data.repository.CompanyRepository
import java.util.UUID

class AssignCompanyRequirement {
    private val repository = CompanyRepository()

    /**
     * Asigna una empresa a un usuario en la API.
     *
     * @param authToken El token del autentificación.
     * @param userId El id del usuario a asignar.
     * @param companyID El id de la empresa a asignar.
     * @return Un mensaje de respuesta de la API.
     */
    suspend operator fun invoke(authToken: String, userId: UUID, companyId: UUID): String? {
        return repository.assignCompany(authToken, userId, companyId)
    }
}
package com.greencircle.domain.model.company

import com.greencircle.domain.model.company.files.CompanyFile
import java.util.UUID

data class Company(
    val userId: UUID,
    val name: String,
    val description: String,
    val email: String,
    val phone: String,
    val webPage: String,
    val street: String,
    val streetNumber: String,
    val city: String,
    val state: String,
    val zipCode: String,
    val files: CompanyFile
)

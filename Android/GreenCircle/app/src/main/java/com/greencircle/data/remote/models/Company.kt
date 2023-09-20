package com.greencircle.data.remote.models

data class Company(
    val userId: String,
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
    val pdfCurriculumUrl: String,
    val pdfGuaranteeSecurityUrl: String,
    val pdfActaConstitutivaUrl: String,
    val pdfIneUrl: String,
)

package com.greencircle.domain.model.company

data class CompanyParams(
    val ordering: String,
    var name: String,
    val state: String,
    val productName: String,
    val latitude: Double,
    val longitude: Double,
)

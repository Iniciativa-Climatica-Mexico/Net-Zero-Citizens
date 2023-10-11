package com.greencircle.domain.model.company

data class CompanyParams(
    var ordering: String,
    var name: String,
    var state: String,
    var productName: String,
    var latitude: Double,
    var longitude: Double,
)
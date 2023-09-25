package com.greencircle.domain.model.catalogue

import com.greencircle.domain.model.company.CompanySummary

data class CatalogueResponse(
    val rows: ArrayList<CompanySummary>,
    val start: Int,
    val pageSize: Int,
    val total: Int
)

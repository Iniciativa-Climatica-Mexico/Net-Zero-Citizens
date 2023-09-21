package com.greencircle.data.remote.models

import com.greencircle.domain.model.CompanySummary

data class CatalogueResponse(
    val rows: ArrayList<CompanySummary>,
    val start: Int,
    val pageSize: Int,
    val total: Int
)

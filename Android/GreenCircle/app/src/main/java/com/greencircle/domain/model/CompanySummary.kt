package com.greencircle.domain.model

import java.util.UUID

data class CompanySummary(
    val companyId: UUID,
    val name: String,
    val city: String,
    val state: String,
    val rating: Float,
    val profilePicture: String? = null
)

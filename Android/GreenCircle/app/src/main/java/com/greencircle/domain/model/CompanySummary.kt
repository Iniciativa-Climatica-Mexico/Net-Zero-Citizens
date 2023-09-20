package com.greencircle.domain.model
import java.util.UUID

/**
 * This class is used to store the company summary data
 * @property companyId: UUID of the company
 * @property name: Name of the company
 * @property city: City of the company
 * @property state: State of the company
 * @property rating: Rating of the company
 * @property profilePicture: Profile picture of the company (optional)
*/
data class CompanySummary(
    val companyId: UUID,
    val name: String,
    val city: String,
    val state: String,
    val rating: Float,
    val profilePicture: String? = null
)

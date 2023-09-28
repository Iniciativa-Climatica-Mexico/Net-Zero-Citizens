package com.greencircle.domain.model.complaints

import java.util.UUID

data class Complaint(
    val userId: UUID? = null,
    val companyId: UUID? = null,
    val complaintSubject: String,
    val complaintDescription: String,
    val complaintStatus: String
)

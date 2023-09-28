package com.greencircle.domain.model.complaints

import java.util.UUID

data class Complaint(
    val userId: UUID,
    val companyId: UUID,
    val complaintSubject: String,
    val complaintDescription: String,
    val complaintStatus: String
)

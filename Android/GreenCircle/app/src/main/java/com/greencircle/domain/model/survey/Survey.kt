package com.greencircle.domain.model.survey

import java.util.UUID

/**
 * Modela una encuesta
 */
data class Survey(
    val description: String,
    val questions: ArrayList<Question>,
    val surveyId: UUID,
    val title: String,
)

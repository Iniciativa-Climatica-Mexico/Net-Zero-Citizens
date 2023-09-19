package com.greencircle.domain.model.survey

/**
 * Modela una encuesta
 */
data class Survey(
    val description: String,
    val questions: ArrayList<Question>,
    val surveyId: String,
    val title: String,
)

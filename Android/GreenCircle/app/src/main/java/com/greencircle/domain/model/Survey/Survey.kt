package com.greencircle.domain.model.Survey

data class Survey(
    val description: String,
    val questions: ArrayList<Question>,
    val surveyId: String,
    val title: String,
)

package com.greencircle.domain.model.survey

data class Survey(
    val description: String,
    val questions: ArrayList<Question>,
    val surveyId: String,
    val title: String,
)

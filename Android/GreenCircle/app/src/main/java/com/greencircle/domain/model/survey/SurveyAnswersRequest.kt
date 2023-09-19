package com.greencircle.domain.model.survey


/**
 * Modela la estructura del body para enviar las respuestas de una encuesta
 */
data class SurveyAnswersRequest(
    val answers: List<Answer>,
)

package com.greencircle.domain.model.survey

import java.io.Serializable

/**
 * Modela una pregunta de encuesta
 */
data class Question(
    val questionId: String,
    val questionOptions: List<QuestionOption>,
    val questionText: String,
    val questionType: QuestionType,
    val isRequired: Boolean,
    var answer: Answer? = null,
) : Serializable

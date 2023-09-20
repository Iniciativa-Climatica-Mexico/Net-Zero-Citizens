package com.greencircle.domain.model.survey

import java.io.Serializable
import java.util.UUID

/**
 * Modela una pregunta de encuesta
 */
data class Question(
    val questionId: UUID,
    val questionOptions: List<QuestionOption>,
    val questionText: String,
    val questionType: QuestionType,
    val isRequired: Boolean,
    var answer: Answer? = null,
) : Serializable

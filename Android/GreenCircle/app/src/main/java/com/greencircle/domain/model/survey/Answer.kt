package com.greencircle.domain.model.survey

import java.io.Serializable
import java.util.UUID

/**
 * Modela la respuesta de una pregunta de encuesta
 */
data class Answer(
    val scaleValue: Int?,
    val answerText: String?,
    val questionId: UUID?,
) : Serializable

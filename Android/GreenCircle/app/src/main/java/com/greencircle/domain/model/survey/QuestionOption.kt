package com.greencircle.domain.model.survey

import java.io.Serializable
import java.util.UUID

/**
 * Modela una opción de una pregunta de opcion multiple (multiple_choice) de encuesta
 */
data class QuestionOption(
    val questionOptionId: UUID,
    val textOption: String
) : Serializable

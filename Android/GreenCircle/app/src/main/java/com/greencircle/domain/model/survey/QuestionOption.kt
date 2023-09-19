package com.greencircle.domain.model.survey

import java.io.Serializable

/**
 * Modela una opción de una pregunta de opcion multiple (multiple_choice) de encuesta
 */
data class QuestionOption(
    val questionOptionId: String,
    val textOption: String,
) : Serializable

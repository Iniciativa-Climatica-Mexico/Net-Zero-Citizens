package com.greencircle.domain.model.survey

import java.io.Serializable

data class Answer(
    val scaleValue: Int?,
    val answerText: String?,
    val questionId: String?,
) : Serializable

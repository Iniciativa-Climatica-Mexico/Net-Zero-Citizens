package com.greencircle.domain.model.survey

import java.io.Serializable

data class QuestionOption(
    val questionOptionId: String,
    val textOption: String,
) : Serializable

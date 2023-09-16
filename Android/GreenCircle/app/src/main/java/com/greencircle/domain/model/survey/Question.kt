package com.greencircle.domain.model.survey

import java.io.Serializable

data class Question(
    val questionId: String,
    val questionOptions: List<QuestionOption>,
    val questionText: String,
    val questionType: QuestionType,
    val isRequired: Boolean,
    var answer: Answer? = null,
) : Serializable

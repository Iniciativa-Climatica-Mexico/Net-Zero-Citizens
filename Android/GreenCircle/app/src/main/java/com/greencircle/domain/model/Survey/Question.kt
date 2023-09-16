package com.greencircle.domain.model.Survey

data class Question(
    val questionId: String,
    val questionOptions: List<QuestionOption>,
    val questionText: String,
    val questionType: QuestionType,
    val isRequired: Boolean,
)

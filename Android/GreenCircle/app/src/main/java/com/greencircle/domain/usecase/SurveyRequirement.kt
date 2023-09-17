package com.greencircle.domain.usecase

import com.greencircle.data.repository.SurveyRepository
import com.greencircle.domain.model.survey.Answer
import com.greencircle.domain.model.survey.Survey

class SurveyRequirement {
    private val repository = SurveyRepository()

    suspend fun getSurveyPending(): Survey? =
        repository.getSurveyPending()

    suspend fun submitAnswers(surveyId: String, answers: List<Answer>) {
        repository.submitAnswers(surveyId, answers)
    }
}

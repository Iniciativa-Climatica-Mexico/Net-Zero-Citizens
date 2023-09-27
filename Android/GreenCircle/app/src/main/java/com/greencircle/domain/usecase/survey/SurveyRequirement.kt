package com.greencircle.domain.usecase.survey

import android.util.Log
import com.greencircle.data.repository.SurveyRepository
import com.greencircle.domain.model.survey.Answer
import com.greencircle.domain.model.survey.Survey
import java.util.UUID

class SurveyRequirement {
    private val repository = SurveyRepository()

    suspend fun getSurveyPending(userId: UUID): Survey? =
        repository.getSurveyPending(userId)

    suspend fun submitAnswers(surveyId: UUID, userId: UUID, answers: List<Answer>) {
        try {
            repository.submitAnswers(surveyId, userId, answers)
        } catch (e: Exception) {
            Log.i("Salida", e.toString())
        }
    }
}

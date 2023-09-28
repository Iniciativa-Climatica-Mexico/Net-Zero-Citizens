package com.greencircle.domain.usecase.survey

import android.util.Log
import com.greencircle.data.repository.SurveyRepository
import com.greencircle.domain.model.survey.Answer
import com.greencircle.domain.model.survey.Survey
import java.util.UUID

class SurveyRequirement {
    private val repository = SurveyRepository()

    suspend fun getSurveyPending(authToken: String, userId: UUID): Survey? =
        repository.getSurveyPending(authToken, userId)

    suspend fun submitAnswers(
        authToken: String,
        surveyId: UUID,
        userId: UUID,
        answers: List<Answer>
    ) {
        try {
            repository.submitAnswers(authToken, surveyId, userId, answers)
        } catch (e: Exception) {
            Log.i("Salida", e.toString())
        }
    }
}

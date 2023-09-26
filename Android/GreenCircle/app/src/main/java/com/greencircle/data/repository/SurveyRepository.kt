package com.greencircle.data.repository

import com.greencircle.data.remote.survey.SurveyAPIClient
import com.greencircle.domain.model.survey.Answer
import com.greencircle.domain.model.survey.Survey
import java.util.UUID

class SurveyRepository {
    private var apiSurvey = SurveyAPIClient()
    suspend fun getSurveyPending(userId: UUID): Survey? {
        return apiSurvey
            .getSurveyPending(userId)
    }

    suspend fun submitAnswers(surveyId: UUID, userId: UUID, answers: List<Answer>) {
        // send answers to server
        apiSurvey.submitAnswers(
            userId,
            surveyId,
            answers,
        )
    }
}

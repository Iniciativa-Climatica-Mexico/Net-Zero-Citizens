package com.greencircle.data.repository

import com.greencircle.data.remote.survey.SurveyAPIClient
import com.greencircle.domain.model.survey.Answer
import com.greencircle.domain.model.survey.Survey
import java.util.UUID

class SurveyRepository {
    private var apiSurvey = SurveyAPIClient()
    suspend fun getSurveyPending(authToken: String, userId: UUID): Survey? {
        return apiSurvey
            .getSurveyPending(authToken, userId)
    }

    suspend fun submitAnswers(
        authToken: String,
        surveyId: UUID,
        userId: UUID,
        answers: List<Answer>
    ) {
        // send answers to server
        apiSurvey.submitAnswers(
            authToken,
            userId,
            surveyId,
            answers,
        )
    }
}

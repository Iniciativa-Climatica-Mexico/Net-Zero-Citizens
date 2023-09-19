package com.greencircle.data.repository

import com.greencircle.data.remote.SurveyAPIClient
import com.greencircle.domain.model.survey.Answer
import com.greencircle.domain.model.survey.Survey
import java.util.UUID

class SurveyRepository {
    private var apiSurvey = SurveyAPIClient()
    suspend fun getSurveyPending(): Survey? {
        return apiSurvey
            .getSurveyPending(UUID.fromString("8de45630-2e76-4d97-98c2-9ec0d1f3a5b8"))
    }

    suspend fun submitAnswers(surveyId: UUID, answers: List<Answer>) {
        // send answers to server
        apiSurvey.submitAnswers(
            UUID.fromString("8de45630-2e76-4d97-98c2-9ec0d1f3a5b8"),
            surveyId,
            answers
        )
    }
}

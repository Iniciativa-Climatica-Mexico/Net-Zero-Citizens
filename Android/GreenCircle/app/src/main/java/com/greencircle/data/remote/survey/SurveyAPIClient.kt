package com.greencircle.data.remote.survey

import com.greencircle.data.remote.NetworkModel
import com.greencircle.domain.model.survey.Answer
import com.greencircle.domain.model.survey.Survey
import com.greencircle.domain.model.survey.SurveyAnswersRequest
import java.util.UUID

class SurveyAPIClient {
    private lateinit var api: SurveyAPIService

    suspend fun getSurveyPending(authToken: String, userId: UUID): Survey? {
        api = NetworkModel(authToken, SurveyAPIService::class.java)
        return try {
            return api.getSurveyPending(userId)
        } catch (e: java.lang.Exception) {
            e.printStackTrace()
            null
        }
    }

    suspend fun submitAnswers(
        authToken: String,
        userId: UUID,
        surveyId: UUID,
        answers: List<Answer>
    ) {
        api = NetworkModel(authToken, SurveyAPIService::class.java)
        val res = api.postSurveyAnswers(surveyId, userId, SurveyAnswersRequest(answers))
    }
}

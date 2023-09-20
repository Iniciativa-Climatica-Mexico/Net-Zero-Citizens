package com.greencircle.data.remote

import android.util.Log
import com.greencircle.domain.model.survey.Answer
import com.greencircle.domain.model.survey.Survey
import com.greencircle.domain.model.survey.SurveyAnswersRequest
import java.util.UUID

class SurveyAPIClient {
    private lateinit var api: SurveyAPIService

    suspend fun getSurveyPending(userId: UUID): Survey? {
        api = SurveyNetworkModuleDI()
        return try {
            Log.i("Salida", "getSurveyPending")
            val res = api.getSurveyPending(userId)
            Log.i("Salida", res.toString())
            return res
        } catch (e: java.lang.Exception) {
            Log.i("Salida", e.toString())
            e.printStackTrace()
            null
        }
    }

    suspend fun submitAnswers(userId: UUID, surveyId: UUID, answers: List<Answer>) {
        api = SurveyNetworkModuleDI()
        val res = api.postSurveyAnswers(surveyId, userId, SurveyAnswersRequest(answers))
    }
}

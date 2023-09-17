package com.greencircle.data.remote

import android.util.Log
import com.greencircle.domain.model.survey.Answer
import com.greencircle.domain.model.survey.Survey

class SurveyAPIClient {
    private lateinit var api: SurveyAPIService

    suspend fun getSurveyPending(userId: String): Survey? {
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

    suspend fun submitAnswers(userId: String, surveyId: String, answers: List<Answer>) {
//        api = SurveyNetworkModuleDI()
//        try {
//            Log.i("Salida", "submitAnswers")
//            val res = api.submitAnswers(userId, surveyId, answers)
//            Log.i("Salida", res.toString())
//        } catch (e: java.lang.Exception) {
//            Log.i("Salida", e.toString())
//            e.printStackTrace()
//        }
    }
}

package com.greencircle.data.remote

import com.greencircle.domain.model.survey.Survey

class SurveyAPIClient {
    private lateinit var api: SurveyAPIService

    suspend fun getSurveyPending(bearerToken: String): Survey? {
        api = SurveyNetworkModuleDI()
        return try {
            api.getSurveyPending(bearerToken)
        } catch (e: java.lang.Exception) {
            e.printStackTrace()
            null
        }
    }
}

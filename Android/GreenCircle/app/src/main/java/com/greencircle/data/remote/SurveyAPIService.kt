package com.greencircle.data.remote

import com.greencircle.domain.model.survey.Survey
import retrofit2.http.GET
import retrofit2.http.Header

interface SurveyAPIService {
    @GET("pending")
    suspend fun getSurveyPending(@Header("Authorization") bearerToken: String): Survey?
}

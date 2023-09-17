package com.greencircle.data.remote

import com.greencircle.domain.model.survey.Survey
import retrofit2.http.GET
import retrofit2.http.Path

interface SurveyAPIService {
    @GET("pending/{userId}")
    suspend fun getSurveyPending(@Path("userId") userId: String): Survey?
}

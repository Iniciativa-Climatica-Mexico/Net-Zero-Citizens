package com.greencircle.data.remote

import com.google.gson.JsonObject
import com.greencircle.domain.model.survey.Survey
import com.greencircle.domain.model.survey.SurveyAnswersRequest
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Path

interface SurveyAPIService {
    @GET("pending/{userId}")
    suspend fun getSurveyPending(@Path("userId") userId: String): Survey?

    @POST("{surveyId}/answer/{userId}")
    suspend fun postSurveyAnswers(
        @Path("surveyId") surveyId: String,
        @Path("userId") userId: String,
        @Body surveyAnswers: SurveyAnswersRequest,
    ): Call<JsonObject>
}

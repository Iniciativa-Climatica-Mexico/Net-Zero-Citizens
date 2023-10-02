package com.greencircle.data.remote.survey

import com.google.gson.JsonObject
import com.greencircle.domain.model.survey.Survey
import com.greencircle.domain.model.survey.SurveyAnswersRequest
import java.util.UUID
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Path
interface SurveyAPIService {
    @GET("survey/pending/{userId}")
    suspend fun getSurveyPending(@Path("userId") userId: UUID): Survey?

    @POST("survey/{surveyId}/answer/{userId}")
    suspend fun postSurveyAnswers(
        @Path("surveyId") surveyId: UUID,
        @Path("userId") userId: UUID,
        @Body surveyAnswers: SurveyAnswersRequest,
    ): Call<JsonObject>
}

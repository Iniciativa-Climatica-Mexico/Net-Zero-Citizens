package com.greencircle.framework.viewmodel.survey

import android.content.Context
import android.util.Log
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.greencircle.domain.model.survey.Answer
import com.greencircle.domain.model.survey.QuestionType
import com.greencircle.domain.model.survey.Survey
import com.greencircle.domain.usecase.auth.RecoverTokensRequirement
import com.greencircle.domain.usecase.survey.SurveyRequirement
import java.util.UUID
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class SurveyViewModel(private val context: Context) : ViewModel() {
    enum class SubmitStatus {
        success, validationError, error,
    }

    val surveyLiveData = MutableLiveData<Survey?>()
    val submitStatusLiveData = MutableLiveData<SubmitStatus>()

    private val surveyPendingRequirement = SurveyRequirement()
    private val recoverTokens = RecoverTokensRequirement(context)

    fun getSurveyPending(userId: UUID) {
        val tokens = recoverTokens() ?: return
        val authToken = tokens.authToken

        viewModelScope.launch(Dispatchers.IO) {
            val data = surveyPendingRequirement.getSurveyPending(authToken, userId)
            Log.d("Salida", data.toString())
            CoroutineScope(Dispatchers.Main).launch {
                surveyLiveData.postValue(data)
            }
        }
    }

    fun submitAnswers(userId: UUID) {
        try {
            val tokens = recoverTokens() ?: return
            val authToken = tokens.authToken
            val survey = surveyLiveData.value

            if (survey == null) {
                submitStatusLiveData.postValue(SubmitStatus.error)
                return
            }

            val answers = survey.questions.map { question ->
                // check that all requiered questions are answered
                if (question.isRequired && question.answer == null) {
                    submitStatusLiveData.postValue(SubmitStatus.validationError)
                    return
                } else {
                    return@map question.answer
                }
            }.filterNotNull()

            viewModelScope.launch(Dispatchers.IO) {
                surveyPendingRequirement.submitAnswers(authToken, survey.surveyId, userId, answers)
                CoroutineScope(Dispatchers.Main).launch {
                    submitStatusLiveData.postValue(SubmitStatus.success)
                }
            }
        } catch (e: Exception) {
            submitStatusLiveData.postValue(SubmitStatus.error)
        }
    }

    fun onQuestionAnswered(questionId: UUID, answer: String) {
        val question =
            surveyLiveData.value?.questions?.find { it.questionId == questionId } ?: return

        when (question.questionType) {
            QuestionType.scale -> {
                val scaleValue = answer.toInt()
                question.answer = Answer(scaleValue, null, questionId)
            }

            else -> {
                question.answer = Answer(null, answer, questionId)
            }
        }
    }
}
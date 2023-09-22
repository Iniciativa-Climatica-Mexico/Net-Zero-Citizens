package com.greencircle.framework.viewmodel

import android.util.Log
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.greencircle.domain.model.survey.Answer
import com.greencircle.domain.model.survey.QuestionType
import com.greencircle.domain.model.survey.Survey
import com.greencircle.domain.usecase.SurveyRequirement
import java.util.UUID
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class SurveyViewModel : ViewModel() {
    enum class SubmitStatus {
        SUCCESS, VALIDATION_ERROR, ERROR,
    }

    val surveyLiveData = MutableLiveData<Survey?>()
    val submitStatusLiveData = MutableLiveData<SubmitStatus>()
    val surveyPendingRequirement = SurveyRequirement()
    fun getSurveyPending() {
        viewModelScope.launch(Dispatchers.IO) {
            val data = surveyPendingRequirement.getSurveyPending()
            Log.d("Salida", data?.toString() ?: "null")
            CoroutineScope(Dispatchers.Main).launch {
                surveyLiveData.postValue(data)
            }
        }
    }

    fun submitAnswers() {
        try {
            val survey = surveyLiveData.value
            if (survey == null) {
                Log.i("Salida", "Survey is null")
                submitStatusLiveData.postValue(SubmitStatus.ERROR)
                return
            }
            val answers = survey.questions.map { question ->
                // chech that all requiered questions are answered
                if (question.isRequired && question.answer == null) {
                    submitStatusLiveData.postValue(SubmitStatus.VALIDATION_ERROR)
                    return
                } else {
                    return@map question.answer
                }
            }.filterNotNull()

            Log.i("Salida", answers.toString())
            viewModelScope.launch(Dispatchers.IO) {
                surveyPendingRequirement.submitAnswers(survey.surveyId, answers)
                CoroutineScope(Dispatchers.Main).launch {
                    submitStatusLiveData.postValue(SubmitStatus.SUCCESS)
                }
            }
        } catch (e: Exception) {
            Log.i("Salida", e.toString())
            submitStatusLiveData.postValue(SubmitStatus.ERROR)
        }
    }

    fun onQuestionAnswered(questionId: UUID, answer: String) {
        val question = surveyLiveData.value?.questions?.find { it.questionId == questionId }
        if (question == null) {
            Log.i("Salida", "Question not found")
            return
        }

        when (question.questionType) {
            QuestionType.SCALE -> {
                val scaleValue = answer.toInt()
                question.answer = Answer(scaleValue, null, questionId)
            }

            else -> {
                question.answer = Answer(null, answer, questionId)
            }
        }
    }
}

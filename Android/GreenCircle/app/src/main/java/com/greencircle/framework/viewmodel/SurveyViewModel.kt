package com.greencircle.framework.viewmodel

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.greencircle.domain.model.Survey.Question
import com.greencircle.domain.model.Survey.QuestionOption
import com.greencircle.domain.model.Survey.QuestionType
import com.greencircle.domain.model.Survey.Survey

class SurveyViewModel : ViewModel() {
    val surveyLiveData = MutableLiveData<Survey>()

    fun getQuestionList() {
        val mockData = Survey(
            title = "Encuesta Validar",
            description = "Esta es una prueba para conseguir datos",
            surveyId = "Test",
            questions = arrayListOf(
                Question(
                    questionId = "Test",
                    questionText = "Pregunta de ejemplo OPEN, que harias",
                    questionType = QuestionType.open,
                    questionOptions = arrayListOf(),
                ),
                Question(
                    questionId = "Test",
                    questionText = "Pregunta de ejemplo SCALE, que harias",
                    questionType = QuestionType.scale,
                    questionOptions = arrayListOf(),
                ),
                Question(
                    questionId = "Test",
                    questionText = "Pregunta de ejemplo MULTIPLE_CHOICE, que harias",
                    questionType = QuestionType.multiple_choice,
                    questionOptions = arrayListOf(
                        QuestionOption("id1", "Opción 1"),
                        QuestionOption("id2", "Opción 2"),
                        QuestionOption("id3", "Opción 3"),
                    ),
                ),
                Question(
                    questionId = "Test",
                    questionText = "Pregunta de ejemplo OPEN, que harias",
                    questionType = QuestionType.open,
                    questionOptions = arrayListOf(),
                ),
                Question(
                    questionId = "Test",
                    questionText = "Pregunta de ejemplo SCALE, que harias",
                    questionType = QuestionType.scale,
                    questionOptions = arrayListOf(),
                ),
                Question(
                    questionId = "Test",
                    questionText = "Pregunta de ejemplo MULTIPLE_CHOICE, que harias",
                    questionType = QuestionType.multiple_choice,
                    questionOptions = arrayListOf(
                        QuestionOption("id1", "Opción 1"),
                        QuestionOption("id2", "Opción 2"),
                        QuestionOption("id3", "Opción 3"),
                    ),
                ),
            ),
        )
        surveyLiveData.postValue(mockData)
    }
}

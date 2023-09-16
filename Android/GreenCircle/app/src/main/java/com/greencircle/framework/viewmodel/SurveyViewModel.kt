package com.greencircle.framework.viewmodel

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.greencircle.domain.model.survey.Question
import com.greencircle.domain.model.survey.QuestionOption
import com.greencircle.domain.model.survey.QuestionType
import com.greencircle.domain.model.survey.Survey

class SurveyViewModel : ViewModel() {
    val surveyLiveData = MutableLiveData<Survey>()

    fun getQuestionList() {
        val mockData = Survey(
            title = "Encuesta Validar probando lineas largas de titulo",
            description = "Esta es una prueba para conseguir datos",
            surveyId = "Test",
            questions = arrayListOf(
                Question(
                    questionId = "1",
                    questionText = "¿Pregunta de ejemplo OPEN, que harias esta es una pregunta " +
                        "super larga jaja?",
                    questionType = QuestionType.open,
                    questionOptions = arrayListOf(),
                    isRequired = true,
                ),
                Question(
                    questionId = "2",
                    questionText = "Pregunta de ejemplo SCALE, que harias",
                    questionType = QuestionType.scale,
                    questionOptions = arrayListOf(),
                    isRequired = true,
                ),
                Question(
                    questionId = "3",
                    questionText = "Pregunta de ejemplo MULTIPLE_CHOICE, que harias",
                    questionType = QuestionType.multiple_choice,
                    questionOptions = arrayListOf(
                        QuestionOption("id1", "Opción 1"),
                        QuestionOption("id2", "Opción 2"),
                        QuestionOption("id3", "Opción 3"),
                    ),
                    isRequired = false,
                ),
                Question(
                    questionId = "4",
                    questionText = "Pregunta de ejemplo OPEN, que harias",
                    questionType = QuestionType.open,
                    questionOptions = arrayListOf(),
                    isRequired = true,
                ),
                Question(
                    questionId = "5",
                    questionText = "Pregunta de ejemplo SCALE, que harias",
                    questionType = QuestionType.scale,
                    questionOptions = arrayListOf(),
                    isRequired = false,
                ),
                Question(
                    questionId = "6",
                    questionText = "Pregunta de ejemplo MULTIPLE_CHOICE, que harias",
                    questionType = QuestionType.multiple_choice,
                    questionOptions = arrayListOf(
                        QuestionOption("id1", "Opción 1"),
                        QuestionOption("id2", "Opción 2"),
                        QuestionOption("id3", "Opción 3"),
                    ),
                    isRequired = true,
                ),
            ),
        )
        surveyLiveData.postValue(mockData)
    }
}

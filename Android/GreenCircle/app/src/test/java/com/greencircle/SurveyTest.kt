package com.greencircle

import com.google.gson.Gson
import com.greencircle.domain.model.survey.Question
import com.greencircle.domain.model.survey.QuestionOption
import com.greencircle.domain.model.survey.QuestionType
import com.greencircle.domain.model.survey.Survey
import java.util.UUID
import org.junit.Test

/**
 * Pruebas unitarias para la clase Survey
 */
class SurveyTest {
    /**
     * Prueba que se pueda crear una encuesta válida
     */
    @Test
    fun validSurvey() {
        val surevyID = UUID.randomUUID()
        val questionID = UUID.randomUUID()
        val testOption1ID = UUID.randomUUID()
        val testOption2ID = UUID.randomUUID()
        val json = """
            {
                "surveyId": $surevyID,
                "title": "testName",
                "description": "testDescription",
                "questions": [
                    {
                        "questionId": $questionID,
                        "questionText": "testQuestionText",
                        "questionType": "multiple_choice",
                        "questionOptions": [
                            {
                                "questionOptionId": $testOption1ID,
                                "textOption": "testOption1"
                            },
                            {
                                "questionOptionId": $testOption2ID,
                                "textOption": "testOption2"
                            }
                        ]
                    }
                ]
            }
        """.trimIndent()

        val survey = Gson().fromJson(json, Survey::class.java)

        assert(survey.surveyId == surevyID)
        assert(survey.title == "testName")
        assert(survey.description == "testDescription")
        assert(
            survey.questions == listOf(
                Question(
                    questionID,
                    listOf(
                        QuestionOption(testOption1ID, "testOption1"),
                        QuestionOption(testOption2ID, "testOption2"),
                    ),
                    "testQuestionText",
                    QuestionType.multiple_choice,
                    false,
                ),
            ),
        )
    }
}

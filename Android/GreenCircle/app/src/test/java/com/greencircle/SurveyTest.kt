package com.greencircle

import com.google.gson.Gson
import com.greencircle.domain.model.survey.Question
import com.greencircle.domain.model.survey.QuestionOption
import com.greencircle.domain.model.survey.QuestionType
import com.greencircle.domain.model.survey.Survey
import org.junit.Test

class SurveyTest {
    @Test
    fun validSurvey() {
        val json = """
            {
                "surveyId": "testId",
                "title": "testName",
                "description": "testDescription",
                "questions": [
                    {
                        "questionId": "testQuestionId",
                        "questionText": "testQuestionText",
                        "questionType": "multiple_choice",
                        "questionOptions": [
                            {
                                "questionOptionId": "testOption1",
                                "textOption": "testOption1"
                            },
                            {
                                "questionOptionId": "testOption2",
                                "textOption": "testOption2"
                            }
                        ]
                    }
                ]
            }
        """.trimIndent()

        val survey = Gson().fromJson(json, Survey::class.java)

        assert(survey.surveyId == "testId")
        assert(survey.title == "testName")
        assert(survey.description == "testDescription")
        assert(
            survey.questions == listOf(
                Question(
                    "testQuestionId",
                    listOf(
                        QuestionOption("testOption1", "testOption1"),
                        QuestionOption("testOption2", "testOption2"),
                    ),
                    "testQuestionText",
                    QuestionType.multiple_choice,
                    false,
                ),
            ),
        )
    }
}

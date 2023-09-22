package com.greencircle

import com.google.gson.Gson
import com.google.gson.JsonSyntaxException
import com.greencircle.domain.model.survey.Question
import com.greencircle.domain.model.survey.QuestionOption
import com.greencircle.domain.model.survey.QuestionType
import java.util.UUID
import org.junit.Assert.assertNull
import org.junit.Assert.assertThrows
import org.junit.Test

/**
 * Pruebas unitarias para la clase Question
 */
class QuestionTest {
    /**
     * Prueba que se pueda crear una pregunta válida
     */
    @Test
    fun validQuestion() {
        val questionID = UUID.randomUUID()
        val testOption1ID = UUID.randomUUID()
        val testOption2ID = UUID.randomUUID()
        val json = """
            {
                "questionId": $questionID,
                "questionText": "testText",
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
        """.trimIndent()

        val question = Gson().fromJson(json, Question::class.java)

        assert(question.questionId == questionID)
        assert(question.questionText == "testText")
        assert(question.questionType == QuestionType.MULTIPLE_CHOISE)
        assert(
            question.questionOptions == listOf(
                QuestionOption(testOption1ID, "testOption1"),
                QuestionOption(testOption2ID, "testOption2")
            )
        )
    }

    /**
     * Prueba que un valor invalido en questionType genere un valor nulo
     */
    @Test
    fun invalidQuestionData() {
        val questionID = UUID.randomUUID()
        val testOption1ID = UUID.randomUUID()
        val testOption2ID = UUID.randomUUID()
        val json = """
            {
                "questionId": $questionID,
                "questionText": "testText",
                "questionType": "No es un tipo",
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
        """.trimIndent()

        val question = Gson().fromJson(json, Question::class.java)
        assertNull(question.questionType)
    }

    /**
     * Prueba que un json invalido genere una excepción
     */
    @Test
    fun invalidQuestionJson() {
        val questionID = UUID.randomUUID()
        val testOption1ID = UUID.randomUUID()
        val testOption2ID = UUID.randomUUID()
        val json = """
                "questionId": $questionID,
                "questionText": "testText",
                "questionType": "No es un tipo",
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
        """.trimIndent()

        assertThrows(JsonSyntaxException::class.java) {
            Gson().fromJson(json, Question::class.java)
        }
    }
}

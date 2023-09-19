package com.greencircle

import com.google.gson.Gson
import com.google.gson.JsonSyntaxException
import com.greencircle.domain.model.survey.Answer
import org.junit.Assert.assertThrows
import org.junit.Test

/**
 * Pruebas unitarias para la clase Answer
 */
class AnswerTest {
    /**
     * Prueba que se pueda crear una respuesta válida
     */
    @Test
    fun validAnswer() {
        val json = """
            {
                "scaleValue": null,
                "answerText": null,
                "questionId": "testId"
            }
        """.trimIndent()

        val answer = Gson().fromJson(json, Answer::class.java)

        assert(answer.scaleValue == null)
        assert(answer.answerText == null)
        assert(answer.questionId == "testId")
    }

    /**
     * Prueba que un valor invalido en scaleValue genere una excepción
     */
    @Test
    fun invalidAnswerData() {
        val json = """
            {
                "scaleValue": "Not an int",
                "answerText": null,
                "questionId": 123
            }
        """.trimIndent()
        assertThrows(JsonSyntaxException::class.java) {
            Gson().fromJson(json, Answer::class.java)
        }
    }

    /**
     * Prueba que un json invalido genere una excepción
     */
    @Test
    fun invalidAnswerJson() {
        val json = """
         
                "scaleValue": null,
                "answerText": null,
                "questionId": "t
        """.trimIndent()

        assertThrows(JsonSyntaxException::class.java) {
            Gson().fromJson(json, Answer::class.java)
        }
    }
}

package com.greencircle

import com.google.gson.Gson
import com.google.gson.JsonSyntaxException
import com.greencircle.domain.model.survey.Answer
import org.junit.Assert.assertThrows
import org.junit.Test
import java.util.UUID

/**
 * Pruebas unitarias para la clase Answer
 */
class AnswerTest {
    /**
     * Prueba que se pueda crear una respuesta válida
     */
    @Test
    fun validAnswer() {
        val questionID = UUID.randomUUID()
        val json = """
            {
                "scaleValue": null,
                "answerText": null,
                "questionId": $questionID
            }
        """.trimIndent()

        val answer = Gson().fromJson(json, Answer::class.java)

        assert(answer.scaleValue == null)
        assert(answer.answerText == null)
        assert(answer.questionId == questionID)
    }

    /**
     * Prueba que un valor invalido en scaleValue genere una excepción
     */
    @Test
    fun invalidAnswerData() {
        val questionID = UUID.randomUUID()
        val json = """
            {
                "scaleValue": "Not an int",
                "answerText": null,
                "questionId": $questionID
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
        val questionID = UUID.randomUUID()
        val json = """
         
                "scaleValue": null,
                "answerText": null,
                "questionId": $questionID
        """.trimIndent()

        assertThrows(JsonSyntaxException::class.java) {
            Gson().fromJson(json, Answer::class.java)
        }
    }
}

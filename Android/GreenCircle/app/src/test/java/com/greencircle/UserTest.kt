package com.greencircle

import com.greencircle.data.remote.UserAPIService
import org.junit.Assert.assertEquals
import org.junit.Test

/**
 * Clase de prueba para la funcionalidad relacionada con usuarios.
 *
 * Esta clase de prueba contiene métodos de prueba para evaluar la creación de objetos `UserAPIService.UpdateUserRequest`
 * y la igualdad entre ellos.
 */
class UserTest {

    /**
     * Prueba la creación de un objeto `UserAPIService.UpdateUserRequest` y verifica la integridad de los datos.
     */
    @Test
    fun testUpdateUserInstantiation() {
        val phoneNumber = "4423045678"
        val age = "21"
        val state = "Querétaro"
        val gender = "Femenino"
        val roleId = "CUSTOMER_ROLE_ID"

        val userInfo = UserAPIService.UpdateUserRequest(
            phoneNumber = phoneNumber,
            age = age,
            state = state,
            gender = gender,
            roleId = roleId
        )

        // Checar la integridad de los datos
        assertEquals(phoneNumber, userInfo.phoneNumber)
        assertEquals(age, userInfo.age)
        assertEquals(state, userInfo.state)
        assertEquals(gender, userInfo.gender)
        assertEquals(roleId, userInfo.roleId)
    }

    /**
     * Prueba la igualdad entre dos objetos `UserAPIService.UpdateUserRequest` con los mismos valores.
     */
    @Test
    fun testEquals() {
        val phoneNumber = "4423045678"
        val age = "21"
        val state = "Querétaro"
        val gender = "Femenino"
        val roleId = "CUSTOMER_ROLE_ID"

        val userInfo = UserAPIService.UpdateUserRequest(
            phoneNumber = phoneNumber,
            age = age,
            state = state,
            gender = gender,
            roleId = roleId
        )

        val userInfo2 = UserAPIService.UpdateUserRequest(
            phoneNumber = phoneNumber,
            age = age,
            state = state,
            gender = gender,
            roleId = roleId
        )

        assertEquals(userInfo, userInfo2)
    }
}
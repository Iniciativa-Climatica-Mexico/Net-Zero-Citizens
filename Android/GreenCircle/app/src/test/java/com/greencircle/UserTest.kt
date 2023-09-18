package com.greencircle

import com.greencircle.data.remote.UserAPIService
import org.junit.Assert.assertEquals
import org.junit.Test

class UserTest {
    @Test
    fun testUpdateUserInstantiation() {
        val phoneNumber = "4423045678"
        val age = "21"
        val state = "Querétaro"
        val gender = "Femenino"

        val userInfo = UserAPIService.UpdateUserRequest(
            phoneNumber = phoneNumber,
            age = age,
            state = state,
            gender = gender
        )

        // Checar la integridad de los datos
        assertEquals(phoneNumber, userInfo.phoneNumber)
        assertEquals(age, userInfo.age)
        assertEquals(state, userInfo.state)
        assertEquals(gender, userInfo.gender)
    }

    @Test
    fun testEquals() {
        val phoneNumber = "4423045678"
        val age = "21"
        val state = "Querétaro"
        val gender = "Femenino"

        val userInfo = UserAPIService.UpdateUserRequest(
            phoneNumber = phoneNumber,
            age = age,
            state = state,
            gender = gender
        )

        val userInfo2 = UserAPIService.UpdateUserRequest(
            phoneNumber = phoneNumber,
            age = age,
            state = state,
            gender = gender
        )

        assertEquals(userInfo, userInfo2)
    }
}
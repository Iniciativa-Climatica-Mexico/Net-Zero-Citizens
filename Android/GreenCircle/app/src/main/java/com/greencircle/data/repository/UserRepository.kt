package com.greencircle.data.repository

import android.util.Log
import com.greencircle.data.remote.UserAPIClient
import com.greencircle.domain.model.User
class UserRepository {
    private val api = UserAPIClient()
    suspend fun getUser(userId: String): User? {
        val response = api.getUser(userId)
        Log.d("prueba", response.toString())
        return response
    }
}
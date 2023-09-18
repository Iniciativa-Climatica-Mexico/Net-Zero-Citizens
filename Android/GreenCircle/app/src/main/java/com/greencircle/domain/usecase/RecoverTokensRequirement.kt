package com.greencircle.domain.usecase

import android.content.Context
import com.greencircle.data.repository.TokenRepository

class RecoverTokensRequirement(private val context: Context) {
    private val sharedPreferences =
        context.getSharedPreferences("my_preferences", Context.MODE_PRIVATE)
    private val repository = TokenRepository(sharedPreferences)
    suspend operator fun invoke(): TokenRepository.Tokens =
        repository.recoverTokens() ?: throw Exception("Tokens not found")
}
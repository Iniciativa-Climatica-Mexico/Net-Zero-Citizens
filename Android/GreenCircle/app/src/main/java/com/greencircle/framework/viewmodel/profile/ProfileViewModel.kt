package com.greencircle.framework.viewmodel.profile

import android.content.Context
import android.util.Log
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.greencircle.domain.model.profile.Profile
import com.greencircle.domain.usecase.auth.DeleteUserSessionRequirement
import com.greencircle.domain.usecase.auth.RecoverTokensRequirement
import com.greencircle.domain.usecase.auth.SaveTokensRequirement
import com.greencircle.domain.usecase.auth.SaveUserSessionRequirement
import com.greencircle.domain.usecase.auth.UpdateTokensDataRequirement
import com.greencircle.domain.usecase.profile.EditProfileRequirement
import com.greencircle.domain.usecase.profile.ProfileListRequirement
import com.greencircle.domain.usecase.user.DeleteUserRequirement
import java.util.UUID
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class ProfileViewModel(private val context: Context) : ViewModel() {
    val userLiveData = MutableLiveData<Profile>()
    private val userListRequirement = ProfileListRequirement()
    private val editUserRequirement = EditProfileRequirement()
    private val deleteUser = DeleteUserRequirement()
    private val recoverTokens = RecoverTokensRequirement(context)
    private val updateTokensData = UpdateTokensDataRequirement()
    private val saveTokens = SaveTokensRequirement(context)
    private val saveUserSession = SaveUserSessionRequirement(context)
    private val deleteUserSession = DeleteUserSessionRequirement(context)
    private val deleteTokens = DeleteUserSessionRequirement(context)
    private lateinit var userId: UUID
    fun setUserId(userId: UUID) {
        this.userId = userId
    }

    fun getUserProfile() {
        viewModelScope.launch(Dispatchers.IO) {
            val tokens = recoverTokens() ?: return@launch
            val authToken = tokens.authToken
            val result: Profile? = userListRequirement(authToken, userId)
            if (result == null) {
                Log.d("SalidaGetUser", "result is null")
            } else {
                CoroutineScope(Dispatchers.Main).launch {
                    userLiveData.postValue(result!!)
                }
            }
        }
    }

    fun updateUser(user: Profile) {
        viewModelScope.launch(Dispatchers.IO) {
            val tokens = recoverTokens() ?: return@launch
            val authToken = tokens.authToken
            val result = editUserRequirement(authToken, userId, user)
            // Actualizar información de los tokens
            if (result != null) {
                val tokens = recoverTokens()
                val cauthToken = tokens?.authToken
                val res = cauthToken?.let { updateTokensData(it) }

                // Guardar tokens
                val authToken = res?.tokens?.authToken
                val refreshToken = res?.tokens?.refreshToken
                saveTokens(authToken!!, refreshToken!!)

                // Guardar usuario global
                if (res != null) {
                    saveUserSession(res.user)
                }
            }
        }
    }

    fun deleteUser(userId: UUID) {
        viewModelScope.launch(Dispatchers.IO) {
            val tokens = recoverTokens() ?: return@launch
            val authToken = tokens.authToken
            val response = deleteUser(authToken, userId)
            if (response != null) {
                // Eliminar tokens
                deleteTokens()
                // Eliminar usuario global
                deleteUserSession()
            }
        }
    }
}
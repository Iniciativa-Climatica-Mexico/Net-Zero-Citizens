package com.greencircle.framework.viewmodel.company.files

import android.content.Context
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.greencircle.domain.usecase.auth.RecoverTokensRequirement
import com.greencircle.domain.usecase.company.UploadCompanyFileRequirement
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import okhttp3.MultipartBody

class UploadFilesViewModel(private val context: Context) : ViewModel() {
    private val uploadCompanyFileRequirement = UploadCompanyFileRequirement()
    private val recoverTokens = RecoverTokensRequirement(context)

    fun uploadFile(companyId: String, file: MultipartBody.Part) {
        viewModelScope.launch(Dispatchers.IO) {
            val tokens = recoverTokens() ?: return@launch
            val authToken = tokens.authToken

            uploadCompanyFileRequirement(companyId, file, authToken)
        }
    }
}
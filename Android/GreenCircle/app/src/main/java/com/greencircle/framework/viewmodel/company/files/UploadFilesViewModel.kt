package com.greencircle.framework.viewmodel.company.files

import android.content.Context
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.greencircle.domain.usecase.company.UploadCompanyFileRequirement
import java.io.File
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class UploadFilesViewModel(private val context: Context) : ViewModel() {
    private val uploadCompanyFileRequirement = UploadCompanyFileRequirement()

    fun uploadFile(companyId: String, file: File, authToken: String) {
        viewModelScope.launch(Dispatchers.IO) {
            uploadCompanyFileRequirement(companyId, file, authToken)
        }
    }
}
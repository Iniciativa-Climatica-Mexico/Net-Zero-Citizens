package com.greencircle.framework.viewmodel.company.files

import android.content.Context
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.greencircle.domain.model.company.files.FileDescription
import com.greencircle.domain.model.company.files.FileFormat
import com.greencircle.domain.usecase.company.UploadCompanyFileRequirement
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import okhttp3.MultipartBody

class UploadFilesViewModel(private val context: Context) : ViewModel() {
    private val uploadCompanyFileRequirement = UploadCompanyFileRequirement()

    fun uploadFile(
        authToken: String,
        filePart: MultipartBody.Part,
        companyId: String,
        fileDescription: FileDescription,
        fileFormat: FileFormat
    ) {
        viewModelScope.launch(Dispatchers.IO) {
            uploadCompanyFileRequirement(
                authToken,
                filePart,
                companyId,
                fileDescription,
                fileFormat
            )
        }
    }
}
package com.greencircle.framework.viewmodel.reviews

import android.content.Context
import android.util.Log
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.greencircle.domain.model.reviews.CompanyReviewObject
import com.greencircle.domain.usecase.auth.RecoverTokensRequirement
import com.greencircle.domain.usecase.reviews.CompanyReviewListRequirement
import java.util.UUID
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class CompanyReviewViewModel(private val context: Context) : ViewModel() {
    val reviewObjectLiveData = MutableLiveData<CompanyReviewObject?>()
    private val companyReviewListRequirement = CompanyReviewListRequirement()
    private val recoverTokens = RecoverTokensRequirement(context)

    private lateinit var companyId: UUID

    fun setCompanyId(companyId: UUID) {
        this.companyId = companyId
    }

    fun getReviewsList() {
        viewModelScope.launch(Dispatchers.IO) {
            val tokens = recoverTokens() ?: return@launch
            val authToken = tokens.authToken
            val result: CompanyReviewObject? = companyReviewListRequirement(authToken, companyId)
            if (result == null) {
                Log.d("Salida", "result is null")
            } else {
                CoroutineScope(Dispatchers.Main).launch {
                    reviewObjectLiveData.postValue(result)
                }
            }
        }
    }
}
package com.greencircle.framework.viewmodel

import android.util.Log
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.greencircle.domain.model.CompanyReviewObject
import com.greencircle.domain.usecase.CompanyReviewListRequirement
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class CompanyReviewViewModel : ViewModel() {
    val reviewObjectLiveData = MutableLiveData<CompanyReviewObject>()
    private val companyReviewListRequirement = CompanyReviewListRequirement()

    private lateinit var companyId: String

    fun setCompanyId(companyId: String) {
        this.companyId = companyId
    }

    fun getReviewsList() {
        viewModelScope.launch(Dispatchers.IO) {
            val result: CompanyReviewObject? = companyReviewListRequirement(companyId)
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
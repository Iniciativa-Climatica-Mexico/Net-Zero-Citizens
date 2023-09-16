package com.greencircle.framework.viewmodel

import android.util.Log
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.greencircle.domain.model.survey.Survey
import com.greencircle.domain.usecase.SurveyPendingRequirement
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class SurveyViewModel : ViewModel() {
    val surveyLiveData = MutableLiveData<Survey?>()
    val surveyPendingRequirement = SurveyPendingRequirement()
    fun getSurveyPending() {
        viewModelScope.launch(Dispatchers.IO) {
            val data = surveyPendingRequirement()
            Log.d("Salida", data?.toString() ?: "null")
            CoroutineScope(Dispatchers.Main).launch {
                surveyLiveData.postValue(data)
            }
        }
    }
}

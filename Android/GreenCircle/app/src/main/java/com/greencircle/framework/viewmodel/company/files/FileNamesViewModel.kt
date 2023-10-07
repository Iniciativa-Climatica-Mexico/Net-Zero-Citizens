package com.greencircle.framework.viewmodel.company.files

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
class FileNamesViewModel() : ViewModel() {
    var idFileName = MutableLiveData<String>()
    var constitutiveFileName = MutableLiveData<String>()
    var curriculumFileName = MutableLiveData<String>()
    var dirCdmxFileName = MutableLiveData<String>()
    var fideFileName = MutableLiveData<String>()
    var heatersLessThanFileName = MutableLiveData<String>()
    var heatersMoreThanFileName = MutableLiveData<String>()
    var photovoltaicsFileName = MutableLiveData<String>()
    var commitmentFileName = MutableLiveData<String>()
}
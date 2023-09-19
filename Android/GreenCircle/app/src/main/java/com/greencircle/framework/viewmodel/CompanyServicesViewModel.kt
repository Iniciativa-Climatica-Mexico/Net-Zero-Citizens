package com.greencircle.framework.viewmodel

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.greencircle.domain.model.ServicesObject

/**
 * ViewModel para el fragmento de servicios de la empresa
 * @constructor Crea un objeto del ViewModel
 * @since 1.0.0
 */
class CompanyServicesViewModel : ViewModel() {

    val servicesObjectLiveData = MutableLiveData<ServicesObject>()
}
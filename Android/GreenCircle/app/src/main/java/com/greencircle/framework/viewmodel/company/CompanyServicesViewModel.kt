package com.greencircle.framework.viewmodel.company

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.greencircle.domain.model.service.ServicesObject

/**
 * ViewModel para el fragmento de servicios de la empresa
 * @constructor Crea un objeto del ViewModel
 * @since 1.0.0
 */
class CompanyServicesViewModel : ViewModel() {

    val servicesObjectLiveData = MutableLiveData<ServicesObject>()
}
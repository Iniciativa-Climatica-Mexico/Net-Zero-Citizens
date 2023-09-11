package com.greencircle.framework.viewmodel

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.greencircle.domain.model.ServicesObject

class CompanyServicesViewModel : ViewModel() {

    val servicesObjectLiveData = MutableLiveData<ServicesObject>()

    // TODO: Repository and Getters

    fun getMockServicesList() {
        val mockServices = ServicesObject(
            3,
            arrayListOf(
                com.greencircle.domain.model.ServiceItem(
                    "1",
                    "1",
                    "Service 1",
                    "Description 1",
                    java.sql.Timestamp(0),
                    java.sql.Timestamp(0)
                ),
                com.greencircle.domain.model.ServiceItem(
                    "2",
                    "2",
                    "Service 2",
                    "Description 2",
                    java.sql.Timestamp(0),
                    java.sql.Timestamp(0)
                ),
                com.greencircle.domain.model.ServiceItem(
                    "3",
                    "3",
                    "Service 3",
                    "Description 3",
                    java.sql.Timestamp(0),
                    java.sql.Timestamp(0)
                ),
            )
        )
    }
}
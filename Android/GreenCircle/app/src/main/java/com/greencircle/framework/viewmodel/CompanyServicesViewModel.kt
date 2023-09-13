package com.greencircle.framework.viewmodel

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.greencircle.domain.model.ServicesObject
import java.sql.Timestamp

class CompanyServicesViewModel : ViewModel() {

    val servicesObjectLiveData = MutableLiveData<ServicesObject>()

    // TODO: Repository and Getters

    fun getMockServicesList(): ServicesObject {
        val mockServices = ServicesObject(
            2,
            arrayListOf(
                com.greencircle.domain.model.ServiceItem(
                    companyId = "1",
                    productId = "1",
                    name = "Service 1",
                    description = "Description 1",
                    imgUrl = "https://www.revista.ferrepat.com/wp-content/uploads/2016/06/Instal" +
                        "acion-de-paneles-solares-en-casa.jpg",
                    createdAt = Timestamp(0),
                    updatedAt = Timestamp(0)
                ),
                com.greencircle.domain.model.ServiceItem(
                    companyId = "1",
                    productId = "2",
                    name = "Service 2",
                    description = "Description 2",
                    imgUrl = "https://ibero.mx/sites/default/files/prensaymultimedios/" +
                        "alternative-21581_960_720.jpg",
                    createdAt = Timestamp(0),
                    updatedAt = Timestamp(0)
                ),
            )
        )

        return mockServices
    }
}
package com.greencircle.framework.viewmodel

import android.util.Log
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.greencircle.domain.model.ServiceItem
import com.greencircle.domain.model.ServicesObject
import java.sql.Timestamp

class CompanyServicesViewModel : ViewModel() {

    val servicesObjectLiveData = MutableLiveData<ServicesObject>()

    // TODO: Repository and Getters

    /*
    * Actualiza el observable con los datos de los servicios de la compañía
    */
    fun getMockServicesList() {
        val data = createMOckServicesList()
        Log.d("CompanyServicesViewModel", "Generated mock services data: $data")
        servicesObjectLiveData.postValue(data)
    }

    /*
    * Crea un objeto ServicesObject con datos de prueba
     */
    fun createMOckServicesList(): ServicesObject {

        return ServicesObject(
            arrayListOf(
                ServiceItem(
                    companyId = "1",
                    productId = "1",
                    name = "Service 1",
                    description = "Description 1",
                    "https://www.revista.ferrepat.com/wp-content/uploads/2016/06/Instal" +
                        "acion-de-paneles-solares-en-casa.jpg",
                    createdAt = Timestamp(0),
                    updatedAt = Timestamp(0)
                ),
                ServiceItem(
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
    }
}
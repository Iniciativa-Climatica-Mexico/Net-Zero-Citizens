package com.greencircle.data.repository

import com.greencircle.data.remote.complaints.ComplaintAPI
import com.greencircle.domain.model.complaints.Complaint
import okhttp3.ResponseBody
import retrofit2.Response

/**
 * Clase que se encarga de realizar las peticiones al servidor
 * @param api: ComplaintAPI -> Interfaz de las peticiones
 * @constructor Crea un objeto de tipo ComplaintRepository
 * @since 2.0.0
 */
class ComplaintRepository(private val api: ComplaintAPI) {
    suspend fun postComplaint(complaint: Complaint): Response<ResponseBody> {
        return api.postComplaint(complaint)
    }
}
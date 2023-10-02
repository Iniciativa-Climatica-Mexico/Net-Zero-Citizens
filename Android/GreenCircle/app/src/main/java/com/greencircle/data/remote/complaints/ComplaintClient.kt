package com.greencircle.data.remote.complaints

import com.greencircle.data.remote.NetworkModel
import com.greencircle.domain.model.complaints.Complaint
import okhttp3.ResponseBody
import retrofit2.Response

class ComplaintClient {
    private lateinit var api: ComplaintAPI

    suspend fun postComplaint(
        authToken: String,
        complaint: Complaint
    ): Response<ResponseBody>? {
        api = NetworkModel(authToken, ComplaintAPI::class.java)
        return try {
            api.postComplaint(complaint)
        } catch (e: Exception) {
            null
        }
    }
}
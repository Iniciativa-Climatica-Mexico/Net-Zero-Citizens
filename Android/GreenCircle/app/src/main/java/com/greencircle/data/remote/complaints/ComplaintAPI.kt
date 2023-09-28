package com.greencircle.data.remote.complaints

import com.greencircle.domain.model.complaints.Complaint
import okhttp3.ResponseBody
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.POST

interface ComplaintAPI {
    /**
     * Envia una queja contra un proveedor de servicios
     * @path userId: UUID -> Id del usuario
     * @path companyId: UUID -> Id de la empresa
     * @body complaint: Complaint -> Queja
     * @return Response<ResponseBody> -> Respuesta de la petición
     * @since 2.0.0
     */
    @POST("complaints/create")
    suspend fun postComplaint(
        @Body complaint: Complaint
    ): Response<ResponseBody>
}
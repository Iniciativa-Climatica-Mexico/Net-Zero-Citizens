package com.greencircle.data.remote.complaints

import com.greencircle.domain.model.complaints.Complaint
import java.util.UUID
import okhttp3.ResponseBody
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.POST
import retrofit2.http.Path

interface ComplaintAPI {
    /**
     * Envia una queja contra un proveedor de servicios
     * @path userId: UUID -> Id del usuario
     * @path companyId: UUID -> Id de la empresa
     * @body complaint: Complaint -> Queja
     * @return Response<ResponseBody> -> Respuesta de la petición
     * @since 2.0.0
     */
    @POST("{userId}/{companyId}")
    suspend fun postComplaint(
        @Path("userId") userId: UUID,
        @Path("companyId") companyId: UUID,
        @Body complaint: Complaint
    ): Response<ResponseBody>
}
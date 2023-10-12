import type { Company } from '@/@types/company/company'
import { authAxios } from '../axios.config'
import type { CompanyComplaints } from '@/@types/complaint/complaint'
import type { ComplaintsWithUser } from '@/@types/complaint/complaint'

/**
 * @brief
 * Funcion que regresa los complaints por empresa
 * @param status
 * @returns Una respuesta conteniendo todos los complaints por id de las empresas
 */

export const getCompaniesWithComplaints = async () => {
  try {
    const approvedCompaniesWithComplaints = await authAxios().get('/company/approved/complaints')
    const companies = approvedCompaniesWithComplaints.data

    return companies
  } catch (error) {
    console.error('Error fetching companies with complaints:', error)
    throw error
  }
}

export const getComplaintsWithUsers = async (companyId: string) => {
  try {
    const complaintsByCompany = await authAxios().get(
      `/complaints/company/${companyId}`
    )
    const complaints = complaintsByCompany.data.rows
    const complaintsWithUsers: ComplaintsWithUser[] = []
    for (const complaint of complaints) {
      const user = await authAxios().get(`/users/${complaint.userId}`)
      complaintsWithUsers.push({ ...user.data, ...complaint })
    }

    return complaintsWithUsers
  } catch (error) {
    console.error('Error fetching companies with complaints:', error)
    throw error
  }
}

export const postUpdateStatus = async (
  complaintId: string,
  complaintStatus: string
): Promise<void> => {
  const complaintStatusType = {
    complaintId,
    complaintStatus,
  }
  try {
    await authAxios().put('/complaints/update', complaintStatusType)
  } catch (error) {
    console.error('Error updating complaint status:', error)
    throw error
  }
}

import { SERVER_BASE_URL } from '@/utils/constants'
import axios from 'axios'

export interface Company {
  companyId: string
  name: string
  profilePicture: string
  state: string
  city: string
  street: string
  zipCode: string
  status: 'approved' | 'pending_approval' | 'rejected'
  email: string
  phone: string
  webPage: string
  description: string
  createdAt: string
  streetNumber: string
  pdfCurriculumURL: string
  pdfDicCdmxURL: string
  pdfPeeFideURL: string
  pdfGuaranteeSecurityURL: string
  pdfActaConstitutivaURL: string
  pdfINEURL: string
}

/**
 * @brief
 * Funcion que regresa los proveedores pendientes por aprobar
 * @param authToken - The authentication token to be passed in the request headers.
 * @returns Una respuesta conteniendo todos los proveedores pendientes
 */
export const getPendingCompanies = async () => {
  try {
    /* if (!authToken) {
      throw new Error('No authToken provided')
    }*/

    const response = await axios.get(`${SERVER_BASE_URL}/company/pending`, {
      /*headers: {
        Authorization: `Bearer ${authToken}`,
      },*/
    })
    return response.data.rows
  } catch (error) {
    console.error('Error fetching pending companies:', error)
    throw error
  }
}

export type UpdateCompanyInfoBody = {
  name: string
  description: string
  street: string
  streetNumber: string
  city: string
  state: string
  zipCode: string
  profilePicture: string
  status: 'approved' | 'pending_approval' | 'rejected'
  phone: string
  webPage: string
}

export const updateCompany = async (
  companyId: string,
  updateInfo: UpdateCompanyInfoBody
) => {
  try {
    const response = await axios.post(
      `${SERVER_BASE_URL}/company/pending/${companyId}`,
      updateInfo
      /*{
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }*/
    )
    return response.data
  } catch (error) {
    console.error('Error updating company:', error)
    throw error
  }
}

import { authAxios } from '../axios.config'

export interface CompanyFiles {
  companyFileId: string
  companyId: string
  fileUrl: string
  fileDescription: string
  fileFormat: string
}

export interface Company {
  companyId: string
  userId: string | null
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
  files: CompanyFiles[]
}

/**
 * @brief
 * Funcion que regresa los proveedores pendientes por aprobar
 * @param status
 * @returns Una respuesta conteniendo todos los proveedores pendientes
 */
export const getPendingCompanies = async () => {
  try {
    const response = await authAxios().get('/company/pending')
    console.log(response.data.rows)
    return response.data.rows
  } catch (error) {
    console.error('Error fetching pending companies:', error)
    throw error
  }
}

/**
 * @brief
 * Funcion que regresa los proveedores aprobados
 * @param status
 * @returns Una respuesta conteniendo todos los proveedores aprobados
 */
export const getApprovedCompanies = async () => {
  try {
    const response = await authAxios().get('/company/approved')
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

/**
 * @brief Actualiza la información de un proveedor
 * @param companyId
 * @param updateInfo
 * @returns
 */

export const updateCompany = async (
  companyId: string,
  updateInfo: UpdateCompanyInfoBody
) => {
  try {
    const response = await authAxios().post(
      `/company/pending/${companyId}`,
      updateInfo
    )
    return response.data
  } catch (error) {
    console.error('Error updating company:', error)
    throw error
  }
}

export const getCompanyFileDownload = async (
  companyId: string,
  fileDescription: string,
  fileFormat: string
) => {
  try {
    const response = await authAxios().get<ArrayBuffer>(
      `/company/download/file/${companyId}/${fileDescription}/${fileFormat}`,
      {
        responseType: 'arraybuffer',
      }
    )
    console.log('response', response)

    const blob = new Blob([response.data], { type: 'application/pdf' }) // Assuming it's a pdf file.

    // Extract filename from the Content-Disposition header or fall back to a default name
    const contentDisposition = response.headers['content-disposition']
    let fileName = `${fileDescription}.${fileFormat}` // default name
    if (contentDisposition) {
      const fileNameMatch = contentDisposition.match(/filename="([^"]+)"/)
      if (fileNameMatch.length > 1) {
        fileName = fileNameMatch[1]
      }
    }

    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch (error) {
    console.error('Error fetching file:', error)
  }
}

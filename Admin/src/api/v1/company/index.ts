import axios from 'axios'
import { SERVER_BASE_URL } from '@/utils/constants'

/**
 * @brief
 * Funcion que regresa los proveedores pendientes por aprobar
 * @param authToken - The authentication token to be passed in the request headers.
 * @returns Una respuesta conteniendo todos los proveedores pendientes
 */
export const getPendingCompanies = async (authToken: string | null) => {
  try {
    if (!authToken) {
      throw new Error('No authToken provided')
    }

    const response = await axios.get(`${SERVER_BASE_URL}/company/pending`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    return response.data.rows
  } catch (error) {
    console.error('Error fetching pending companies:', error)
    throw error
  }
}

import axios from 'axios'
import { apiV1Url } from '@/utils/constants'

/**
 * @brief
 * @brief
 * Funcion que regresa los proveedores pendientes por aprobar
 * @param authToken - The authentication token to be passed in the request headers.
 * @returns Una respuesta conteniendo todos los proveedores pendientes
 */
export const getPendingCompanies = async () => {
  try {
    const response = await axios.get(`${apiV1Url}/company/pending`)
    return response.data.rows
  } catch (error) {
    console.error('Error fetching pending companies:', error)
    throw error
  }
}

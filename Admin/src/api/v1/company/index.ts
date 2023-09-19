import axios from 'axios'
import { SERVER_BASE_URL } from '@/utils/constants'

/**
 * @brief
 * Funcion que regresa los proveedores pendientes por aprobar
 * @returns Una respuesta conteniendo todos los proveedores pendientes
 */
export const getPendingCompanies = async () => {
  try {
    const response = await axios.get(`${SERVER_BASE_URL}/company/pending`)
    return response.data.rows
  } catch (error) {
    console.error('Error fetching pending companies:', error)
    throw error
  }
}

import axios from 'axios'
import axios from 'axios'

const backendBaseUrl = 'http://localhost:3000'
const backendBaseUrl = 'http://localhost:3000'

/**
 * @brief
 * @brief
 * Funcion que regresa los proveedores pendientes por aprobar
 * @returns Una respuesta conteniendo todos los proveedores pendientes
 */
export const getPendingCompanies = async () => {
  try {
    const response = await axios.get(`${backendBaseUrl}/api/v1/company/pending`)
    return response.data.rows
  } catch (error) {
    console.error('Error fetching pending companies:', error)
    throw error
  }
}

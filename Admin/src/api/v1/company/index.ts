import axios from 'axios'

const backendBaseUrl = 'http://localhost:3000'

/**
 * @brief
 * Funcion que regresa los proveedores pendientes por aprobar
 * @returns Una respuesta conteniendo todos los proveedores pendientes
 */
export const getPendingCompanies = async () => {
  try {
    const response = await axios.get(`${backendBaseUrl}/api/v1/company/pending`)
    return response.data
  } catch (error) {
    console.error('Error fetching pending companies:', error)
    throw error
  }
}

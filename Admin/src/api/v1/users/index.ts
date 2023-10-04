import { authAxios } from '../axios.config'
import type { User } from '@/@types/users/users'
/**
 * @brief
 * Funcion que obtiene todos los usuarios
 * @param status
 * @returns Un arreglo con todos los usuarios
 */
export const getAllUsers = async () => {
  try {
    const response = await authAxios().get('/users')
    return response.data.rows as User[]
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}

/**
 * @brief
 * Funcion que elimina a un usuario
 * @param userId
 * @returns El status de la peticion
 */

export const deleteUser = async (userId: string) => {
  try {
    const response = await authAxios().delete(`/users/delete/${userId}`)
    return response.status
  } catch (error) {
    console.error('Error deleting user:', error)
    throw error
  }
}

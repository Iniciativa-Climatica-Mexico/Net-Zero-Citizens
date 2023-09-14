import Ecoinfo from '../models/ecoinfo.model'

/**
 * @brief
 * Función del controlador que devuelve todos los ecoinfo
 * de la base de datos
 * @param req La request HTTP al servidor
 * @param res Un objeto paginador con los ecoinfo y la
 *            información de paginación
 */
export const getAllEcoinfo = async (): Promise<Ecoinfo[]> => {
  return await Ecoinfo.findAll()
}

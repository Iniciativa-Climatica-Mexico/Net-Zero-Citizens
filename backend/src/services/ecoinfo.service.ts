import Ecoinfo from '../models/ecoinfo.model'
import { PaginationParams, PaginatedQuery } from '../utils/RequestResponse'

/**
 * @brief
 * Función del controlador que devuelve todos los ecoinfo
 * de la base de datos
 * @param req La request HTTP al servidor
 * @param res Un objeto paginador con los ecoinfo y la
 *            información de paginación
 */
export const getAllEcoinfo = async <T>(
  params: PaginationParams<T>
): Promise<PaginatedQuery<Ecoinfo>> => {
  return await Ecoinfo.findAndCountAll({
    limit: params.pageSize,
    offset: params.start,
  })
}

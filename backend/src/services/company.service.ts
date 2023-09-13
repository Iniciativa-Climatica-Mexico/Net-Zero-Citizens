import Company from '../models/company.model'
import { PaginationParams, PaginatedQuery } from '../utils/RequestResponse'

/**
 * @brief
 * Función del servicio que devuelve todos los proveedores de la base de datos
 * @param params Los parametros de paginación
 * @returns Una promesa con los proveedores y la información de paginación
 */
export const getAllCompanies = async <T>(
  params: PaginationParams<T>
): Promise<PaginatedQuery<Company>> => {
  return Company.findAndCountAll({
    limit: params.pageSize,
    offset: params.start,
  })
}

/**
 * @brief
 * Obtiene un proveedor por su id y lo devuelve en la respuesta
 * @param id Id del proveedor a buscar
 * @returns Promise<Company | Null> Proveedor con el id especificado
 */
export const getCompanyById = async (id: string): Promise<Company | null> => {
  return Company.findOne({
    where: {
      companyId: id,
    },
  })
}

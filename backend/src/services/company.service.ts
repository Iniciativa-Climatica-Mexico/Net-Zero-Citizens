import Company from '../models/company.model'
import { PaginationParams, PaginatedQuery } from '../utils/RequestResponse'

/**
 * @brief
 * Función del servicio que devuelve el proveedor con el mismo id que contiene el parametro
 * @param companyId
 * @returns Una promesa con la información del proveedor
 */
export const getCompanyInfo = async (
  companyId: string
): Promise<Company | null> => {
  return await Company.findByPk(companyId)
}

/**
 * @brief
 * Función del servicio que devuelve todos los proveedores de la base de datos
 * @param params Los parametros de paginación
 * @returns Una promesa con los proveedores y la información de paginación
 */
export const getAllCompanies = async <T>(
  params: PaginationParams<T>
): Promise<PaginatedQuery<Company>> => {
  return await Company.findAndCountAll({
    limit: params.pageSize,
    offset: params.start,
  })
}

/**
 * @brief
 * Función del servicio que devuelve todos los proveedores pendientes por aprobar
 * @params Los parametros de paginación
 * @returns Una promesa con los proveedores y la información de paginación
 */

export const getPendingCompanies = async <T>(
  params: PaginationParams<T>
): Promise<PaginatedQuery<Company>> => {
  return await Company.findAndCountAll({
    limit: params.pageSize,
    offset: params.start,
    where: {
      status: 'pending_approval',
    },
  })
}

export type UpdateCompanyInfoBody = {
  name: string
  description: string
  location: string
  profilePicture: string
  status: 'approved' | 'pending_approval' | 'rejected'
  phoneNumber: string
  webPage: string
}

/**
 * @brief
 * Actualiza en la base de datos el proveedor con los datos pasados en los parametros
 * @param companyId
 * @param newCompanyInfo
 * @returns Una promesa de la actualización del proveedor en la base de datos.
 */
export const updateCompanyInfo = async (
  companyId: string,
  newCompanyInfo: UpdateCompanyInfoBody
): Promise<Company | null> => {
  const companyInfo = await Company.findByPk(companyId)
  if (companyInfo) {
    return companyInfo.update(newCompanyInfo)
  } else {
    return null
  }
}

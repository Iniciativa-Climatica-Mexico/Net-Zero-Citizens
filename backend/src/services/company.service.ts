import { Company, CompaniesModel } from '../models/company.model'
import { PaginationParams, PaginatedQuery } from '../utils/RequestResponse'


export const getCompanyInfo = async (companyId: string): Promise <Company | null> => {
  return await CompaniesModel.findByPk(companyId)
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
  return await CompaniesModel.findAndCountAll({
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
  return await CompaniesModel.findAndCountAll({
    limit: params.pageSize,
    offset: params.start,
    where: {
      status: 'pending_approval'
    },
  });
};


export type UpdateCompanyInfoBody = {
  name: string
  description: string
  location: string
  profilePicture: string
  status: 'approved' | 'pending_approval' | 'rejected'
  phoneNumber: string
  webPage:string
}

export const updateCompanyInfo = async (
  companyId: string,
  newCompanyInfo: UpdateCompanyInfoBody
): Promise <Company | null> => {
  const companyInfo = await CompaniesModel.findByPk(companyId)
  if (companyInfo){
    await companyInfo.update(newCompanyInfo)
    return companyInfo
  }
  else {
    return null
  }
}
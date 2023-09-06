import { Company, CompanyModel } from '../models/company.model'
import { PaginationParams, PaginatedQuery } from '../utils/RequestResponse'

export const getAllCompanies = async <T>(
  params: PaginationParams<T>
): Promise<PaginatedQuery<Company>> => {
  return await CompanyModel.findAndCountAll({
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
  return CompanyModel.findOne({
    where: {
      companyId: id,
    },
  })
}

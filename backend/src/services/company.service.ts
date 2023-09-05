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

import Company from '../models/company.model'
import CompanyProduct from '../models/companyProduct.model'
import { PaginationParams, PaginatedQuery } from '../utils/RequestResponse'

// TYPES
/**
 * @brief
 * Tipo de dato para el proveedor
 */
export type CompanyType = {
  companyId?: string,
  name: string,
  description: string,
  email: string,
  phoneNumber: string,
  webPage?: string | null,
  street: string,
  streetNumber: number,
  city: string,
  state: string,
  zipCode: number,
  latitude: number,
  longitude: number,
  profilePicture?: string | null,
  pdfCurriculumUrl: string,
  pdfDicCdmxUrl?: string | null,
  pdfPeeFideUrl?: string | null,
  pdfGuaranteeSecurityUrl: string,
  pdfActaConstitutivaUrl: string,
  pdfIneUrl: string,
  status: string,
}

/**
 * @brief
 * Tipo de dato para el proveedor
 */
export type CompanyProductType = {
  companyId: string,
  productId: string,
  pdfProductCertificationUrl: string,
}

/**
 * @brief
 * Tipo de dato para el estatus de la compañia
 */
export type StatusEnum = 'approved' | 'pending_approval' | 'rejected'


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
 * Función del servicio para crear una nueva compañia
 * @param company La compañia a crear
 * @returns Una promesa con los proveedores y la información de paginación
 */
export const createCompany = async (company: CompanyType): Promise<Company | null> => {
  return await Company.create(company)
}

/**
 * @brief
 * Función del servicio para crear asociar un producto a una compañia
 * @param CompanyProduct La información de la asociación (companyId, productId, pdfProductCertificationUrl)
 * @returns Una promesa con los proveedores y la información de paginación
 */
export const addProduct = async (companyProduct: CompanyProductType): Promise<CompanyProduct | null> => {
  return await CompanyProduct.create(companyProduct)
}

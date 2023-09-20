import Company from '../models/company.model'
import CompanyProduct from '../models/companyProducts.model'
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
  phone: string,
  webPage?: string | null,
  street: string,
  streetNumber: string,
  city: string,
  state: string,
  zipCode: number,
  userId: string,
  latitude?: number | null,
  longitude?: number | null,
  profilePicture?: string | null,
  pdfCurriculumUrl: string,
  pdfDicCdmxUrl?: string | null,
  pdfPeeFideUrl?: string | null,
  pdfGuaranteeSecurityUrl: string,
  pdfActaConstitutivaUrl: string,
  pdfIneUrl: string,
  status?: string,
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

/**
 * @brief
 * Regresa compañías ya aprovadas
 * @param status
 */

export const getApprovedCompanies = async <T>(
  params: PaginationParams<T>
): Promise<PaginatedQuery<Company>> => {
  return await Company.findAndCountAll({
    limit: params.pageSize,
    offset: params.start,
    where: {
      status: 'approved',
    },
  })
}
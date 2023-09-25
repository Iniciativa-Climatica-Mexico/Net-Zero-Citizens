import CompanyProducts from '../models/companyProducts.model'
import CompanyFiles from '../models/companyFiles.model'
import Product from '../models/products.model'
import Review from '../models/review.model'
import { col, fn } from 'sequelize'
import Company from '../models/company.model'
import CompanyProduct from '../models/companyProducts.model'
import { PaginationParams, PaginatedQuery } from '../utils/RequestResponse'
import { sendNotification } from './notification.service'

// TYPES
/**
 * @brief
 * Tipo de dato para el proveedor
 */
export type CompanyType = {
  companyId?: string
  name: string
  description: string
  email: string
  phone: string
  webPage?: string | null
  street: string
  streetNumber: string
  city: string
  state: string
  zipCode: string
  userId: string
  profilePicture?: string | null
  status?: string
}

/**
 * @brief
 * Tipo de dato para el proveedor
 */
export type CompanyProductType = {
  companyId: string
  productId: string
  pdfProductCertificationUrl: string
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
  return Company.findAndCountAll({
    limit: params.pageSize,
    offset: params.start,
    include: [
      {
        model: CompanyFiles,
        as: 'CompanyFiles',
      },
    ],
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
  street: string
  streetNumber: string
  city: string
  state: string
  zipCode: string
  profilePicture: string
  status: 'approved' | 'pending_approval' | 'rejected'
  phone: string
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
    await companyInfo.update(newCompanyInfo)
    if (newCompanyInfo.status === 'approved') {
      await sendNotification(
        'Aprobado',
        'Tu compañia ha sido aprobada',
        `${process.env.AWS_ARN}`,
        companyId
      )
    } else if (newCompanyInfo.status === 'rejected') {
      await sendNotification(
        'Rechazado',
        'Tu compañia ha sido rechazada',
        `${process.env.AWS_ARN}`,
        companyId
      )
    }
    return companyInfo
  } else {
    return null
  }
}

/**
 * @brief
 * Función del servicio para crear una nueva compañia
 * @param company La compañia a crear
 * @returns Una promesa con los proveedores y la información de paginación
 */
export const createCompany = async (
  company: CompanyType
): Promise<Company | null> => {
  return await Company.create(company)
}

/**
 * @brief
 * Función del servicio para crear asociar un producto a una compañia
 * @param CompanyProduct La información de la asociación (companyId, productId, pdfProductCertificationUrl)
 * @returns Una promesa con los proveedores y la información de paginación
 */
export const addProduct = async (
  companyProduct: CompanyProductType
): Promise<CompanyProduct | null> => {
  return await CompanyProduct.create(companyProduct)
}

/**
 * @brief
 * Obtiene un proveedor por su id y lo devuelve en la respuesta. Si no
 * existe el proveedor, devuelve null. Añade la puntuación media del proveedor
 * y los productos que vende
 * @param id Id del proveedor a buscar
 * @returns Promise<Company | Null> Proveedor con el id especificado
 */
export const getCompanyById = async (id: string): Promise<Company | null> => {
  const company = await Company.findByPk(id)
  const companyScore = await getCompanyScore(id)
  const companyProducts = await getCompanyProducts(id)
  const companyImages = await getCompanyImages(id)
  const rating = Math.round(companyScore?.[0].getDataValue('score') * 10) / 10
  const comment = companyScore?.[0].getDataValue('review')
  const products: Product[] = []
  const images: CompanyFiles[] = [] // TODO: Hacer cambios correpondientes, para que se devuelvan las imagenes de la compañia

  companyProducts?.forEach(function (product) {
    products.push(product.getDataValue('product').dataValues)
  })

  companyImages?.forEach(function (image) {
    images.push(image.dataValues)
  })

  company?.setDataValue('products', products)
  company?.setDataValue('score', rating)
  company?.setDataValue('oneComment', comment)
  company?.setDataValue('images', images)

  return company
}

const getCompanyImages = async (
  id: string
): Promise<CompanyFiles[] | null> => {
  return await CompanyFiles.findAll({
    where: {
      companyId: id,
      fieldDescription: 'Imagen',
    },
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  })
}

const getCompanyProducts = async (
  id: string
): Promise<CompanyProducts[] | null> => {
  return await CompanyProducts.findAll({
    where: {
      companyId: id,
    },
    include: [
      {
        model: Product,
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      },
    ],
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  })
}

const getCompanyScore = async (id: string): Promise<Review[] | null> => {
  return await Review.findAll({
    where: {
      companyId: id,
    },
    attributes: {
      include: [[fn('AVG', col('score')), 'score'], 'review'],
      exclude: ['reviewId', 'userId', 'createdAt', 'updatedAt'],
    },
  })
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

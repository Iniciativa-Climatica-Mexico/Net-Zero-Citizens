import CompanyProducts from '../models/companyProducts.model'
import CompanyImages from '../models/companyImages.model'
import Product from '../models/products.model'
import Review from '../models/review.model'
import Company from '../models/company.model'
import { PaginationParams, PaginatedQuery } from '../utils/RequestResponse'
import { fn, col } from 'sequelize'

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
  let rating = Math.round(companyScore?.[0].getDataValue('rating') * 10) / 10
  let comment = companyScore?.[0].getDataValue('comment')
  let products: Product[] = []
  let images: CompanyImages[] = []
  companyProducts?.forEach(function (product) {
    products.push(product.getDataValue('product').dataValues)
  })
  companyImages?.forEach(function (image) {
    images.push(image.dataValues)
  })
  company?.setDataValue('products', products)
  company?.setDataValue('rating', rating)
  company?.setDataValue('oneComment', comment)
  company?.setDataValue('images', images)
  return company
}

const getCompanyImages = async (
  id: string
): Promise<CompanyImages[] | null> => {
  return await CompanyImages.findAll({
    where: {
      companyId: id,
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
      include: [[fn('AVG', col('rating')), 'rating'], 'comment'],
      exclude: ['reviewId', 'userId', 'createdAt', 'updatedAt'],
    },
  })
}

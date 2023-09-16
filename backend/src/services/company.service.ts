import CompanyProducts from '../models/companyProducts.model'
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
 * Obtiene un proveedor por su id y lo devuelve en la respuesta
 * @param id Id del proveedor a buscar
 * @returns Promise<Company | Null> Proveedor con el id especificado
 */
export const getCompanyById = async (id: string): Promise<Company | null> => {
  const companyScore = await getCompanyScore(id)
  const companyProducts = await getCompanyProducts(id)
  console.log(companyScore?.[0].getDataValue('rating'))
  console.log(companyProducts?.[0].getDataValue('product').imageUrl)

  return await Company.findByPk(id)
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
      include: [[fn('AVG', col('rating')), 'rating']],
      exclude: ['reviewId', 'userId', 'comment', 'createdAt', 'updatedAt'],
    },
  })
}

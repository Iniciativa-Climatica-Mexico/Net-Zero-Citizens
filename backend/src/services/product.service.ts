import Product from '../models/product.model'
import { PaginationParams, PaginatedQuery } from '../utils/RequestResponse'

/**
 * @brief
 * Función del servicio que devuelve todos los productos de la base de datos
 * @param params Los parametros de paginación
 * @returns Una promesa con los productos y la información de paginación
 */
export const getAllProducts = async <T>(
  params: PaginationParams<T>
): Promise<PaginatedQuery<Product>> => {
  return await Product.findAndCountAll({
    limit: params.pageSize,
    offset: params.start,
  })
}

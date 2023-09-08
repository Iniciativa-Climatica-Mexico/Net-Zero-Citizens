import Review from '../models/review.model'
import { PaginationParams, PaginatedQuery } from '../utils/RequestResponse'

/**
 * @brief
 * Función del servicio que devuelve todos las reviews de la base de datos
 * @param params Los parametros de paginación
 * @returns Una promesa con las reviews y la información de paginación
 */

export const getAllReviews = async <T>(
  params: PaginationParams<T>
): Promise<PaginatedQuery<Review>> => {
  return await Review.findAndCountAll({
    limit: params.pageSize,
    offset: params.start,
  })
}

/**
 * @brief
 * Función del servicio que devuelve un review por id de la base de datos
 * @param params reviewId
 * @returns Una promesa con la review o null
 */

export const getReviewById = async (reviewId: string): Promise<Review | null> => { 
  return await Review.findByPk(reviewId)
}
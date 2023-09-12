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

export const getReviewById = async (
  params: PaginationParams<{ reviewId: string }>
): Promise<PaginatedQuery<Review>> => {
  const { reviewId } = params
  return await Review.findAndCountAll({
    limit: params.pageSize,
    offset: params.start,
    where: {
      reviewId: reviewId,
    },
  })
}

/**
 * @brief
 * Función del servicio que la(s) review(s) por id la compañia de la base de datos
 * @param params companyId
 * @returns Una promesa con la(s) review(s) o null
 */

export const getReviewByCompany = async(
  params: PaginationParams<{ companyId: string }>
): Promise<PaginatedQuery<Review>> => {
  const { companyId } = params
  return await Review.findAndCountAll({
    limit: params.pageSize,
    offset: params.start,
    where: {
      companyId: companyId,
    },
  })
}

/**
 * @brief
 * Función del servicio que la(s) review(s) por id de usuario de la base de datos
 * @param params userId
 * @returns Una promesa con la(s) review(s) o null
 */

export const getReviewByUser = async(
  params: PaginationParams<{ userId: string }>
): Promise<PaginatedQuery<Review>> => {
  const { userId } = params
  return await Review.findAndCountAll({
    limit: params.pageSize,
    offset: params.start,
    where: {
      userId: userId,
    },
  })
}


/**
 * @brief
 * Función del servicio que agrega una review a la base de datos
 * @param params userId, companyId, comment, rating
 * @returns Una promesa con la review creada
 */

export const addReview = async (userId: string, companyId: string, comment: string, rating: number): Promise<Review> => {
  return await Review.create({
    userId: userId,
    companyId: companyId,
    comment: comment,
    rating: rating
  })
}

/**
 * @brief
 * Función del servicio que elimina una review de la base de datos
 * @param params reviewId
 * @returns Una promesa con la review eliminada
 */

export const deleteReview = async (reviewId: string): Promise<Review> => {
  const review = await Review.findOne({
    where: {
      reviewId: reviewId,
    },
  })
  if (review) {
    await review.destroy()
    return review
  } else {
    throw new Error('Review not found')
  }
}
import Review from '../models/review.model'
import User from '../models/users.model'
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

export const getReviewByCompany = async (
  params: PaginationParams<{ companyId: string }>
): Promise<PaginatedQuery<Review>> => {
  const { companyId } = params
  return await Review.findAndCountAll({
    limit: params.pageSize,
    offset: params.start,
    where: {
      companyId: companyId,
    },

    include: [
      {
        model: User,
        attributes: ['firstName', 'lastName'],
      },
    ],
  })
}

/**
 * @brief
 * Función del servicio que la(s) review(s) por id de usuario de la base de datos
 * @param params UUID
 * @returns Una promesa con la(s) review(s) o null
 */

export const getReviewByUser = async (
  params: PaginationParams<{ userId: string }>
): Promise<PaginatedQuery<Review>> => {
  const { userId } = params

  console.log('params', params)

  const test = await Review.findAndCountAll({
    limit: params.pageSize,
    offset: params.start,
    where: {
      userId: userId,
    },
  })

  return test
}

/**
 * @brief
 * Función del servicio que agrega una review a la base de datos
 * @param params UUID, companyId, review, score
 * @returns Una promesa con la review creada
 */
export const addReview = async (
  userId: string,
  companyId: string,
  reviewTitle: string,
  review: string,
  score: number
): Promise<Review> => {
  return await Review.create({
    userId: userId,
    companyId: companyId,
    reviewTitle: reviewTitle,
    review: review,
    score: score,
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

/**
 * @brief
 * Función del servicio que actualiza una review de la base de datos
 * @param params reviewId, review, score
 * @returns Una promesa con la review actualizada
 */

export const updateReview = async (
  reviewId: string,
  reviewTitle: string,
  review: string,
  score: number
): Promise<Review> => {
  const res = await Review.findOne({
    where: {
      reviewId: reviewId,
    },
  })
  if (res) {
    res.reviewTitle = reviewTitle
    res.comment = review
    res.rating = score
    await res.save()
    return res
  } else {
    throw new Error('Review not found')
  }
}

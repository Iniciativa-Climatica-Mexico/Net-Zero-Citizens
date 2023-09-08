import Review from '../models/review.model'
import * as ReviewService from '../services/review.service'
import { NoRecord, Paginator, PaginationParams } from '../utils/RequestResponse'
import { RequestHandler } from 'express'

/**
 * @brief
 * Función del controlador que devuelve todos los reviews
 * de la base de datos
 * @param req La request HTTP al servidor
 * @param res Un objeto paginador con los reviews y la
 *            información de paginación
 */

export const getAllReviews: RequestHandler<
  NoRecord,
  Paginator<Review>,
  NoRecord,
  PaginationParams<{ name?: string }>
> = async (req, res) => {
  const params = {
    start: req.query.start || 0,
    pageSize: req.query.pageSize || 10,
    filters: {
      name: req.query.name || '',
    },
  }

  const reviews = await ReviewService.getAllReviews(params)
  res.json({
    rows: reviews.rows,
    start: params.start,
    pageSize: params.pageSize,
    total: reviews.count,
  })
}

/**
 * @brief
 * Función del controlador que devuelve una review por id
 * de la base de datos
 * @param req La request HTTP al servidor
 * @param res Un objeto paginador con la review y la
 *            información de paginación
 */

export const getReviewById: RequestHandler<{ reviewId: string }> = async (req, res) => {
  const { reviewId } = req.params
  console.log(req.params)
  const review = await ReviewService.getReviewById(reviewId)

  if (review) {
    res.json(review)
  } else {
    res.status(200).status(404).json({ error: 'User not found' })
  }
}
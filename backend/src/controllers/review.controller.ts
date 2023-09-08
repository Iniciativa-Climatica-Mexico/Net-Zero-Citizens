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

export const getReviewById: RequestHandler<
  { reviewId: string },
  Paginator<Review>,
  NoRecord,
  NoRecord
  > = async (req, res) => {
    const { reviewId } = req.params
    const params = {
      start: req.query.start || 0,
      pageSize: req.query.pageSize || 10,
      reviewId: reviewId,
    }
    const review = await ReviewService.getReviewById(params)
    res.json({
      rows: review.rows,
      start: params.start,
      pageSize: params.pageSize,
      total: review.count,
    })
  }

/**
 * @brief
 * Función del controlador que agrega una review a la base de datos
 * @param req La request HTTP al servidor
 * @param res Un objeto con la review creada
 * @returns
 * - 400 si no se envía el userId o el companyId
 * - 200 si se crea la review
 * - 500 si ocurre un error en el servidor
*/

export const addComment: RequestHandler<
  { userId: string, companyId: string },
  string,
  { comment: string },
  NoRecord
  > = async (req, res) => {
    const { userId, companyId } = req.params
    const { comment } = req.body
    if (!userId || !companyId) {
      res.status(400).json('Missing userId or companyId')
      return
    }
    if (!comment) {
      res.status(400).json('Missing review')
      return
    }
    try {
      await ReviewService.addComment(userId, companyId, comment)
      res.status(200).send('Added review')
    } catch (error) {
      console.log(error)
      res.status(500).send('Error')
    }
  }
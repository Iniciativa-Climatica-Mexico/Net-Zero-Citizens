import Review from '../models/review.model'
import * as ReviewService from '../services/review.service'
import { NoRecord, Paginator, PaginationParams } from '../utils/RequestResponse'
import { RequestHandler } from 'express'

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

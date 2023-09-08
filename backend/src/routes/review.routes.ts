import express from 'express'
import * as controller from '../controllers/review.controller'

const router = express.Router()

/**
 * @function getAllReviews
 * @returns List of reviews
 * @description Get all reviews
 */
router.get('/', controller.getAllReviews)


export default router

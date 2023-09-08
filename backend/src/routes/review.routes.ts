import express from 'express'
import * as controller from '../controllers/review.controller'

const router = express.Router()

router.get('/', controller.getAllReviews)
router.get('/:reviewId', controller.getReviewById)

export default router

import express from 'express'
import * as controller from '../controllers/review.controller'

const router = express.Router()

router.get('/', controller.getAllReviews)
router.get('/:reviewId', controller.getReviewById)
router.get('/:companyId', controller.getReviewByCompany)
router.post('/:userId/:companyId', controller.addComment)

export default router

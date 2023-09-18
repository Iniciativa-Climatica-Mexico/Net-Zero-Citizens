import express from 'express'
import * as controller from '../controllers/review.controller'

const router = express.Router()

router.get('/', controller.getAllReviews)
router.get('/:reviewId', controller.getReviewById)
router.get('/company/:companyId', controller.getReviewByCompany)
router.get('/user/:UUID', controller.getReviewByUser)

router.post('/:UUID/:companyId', controller.addReview)

router.delete('/:reviewId', controller.deleteReview)

router.put('/:reviewId', controller.updateReview)

export default router

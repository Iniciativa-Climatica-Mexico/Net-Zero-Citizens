import express from 'express'
import * as controller from '../controllers/complaints.controller'

const router = express.Router()

router.get('/', controller.getAllReviews)

export default router

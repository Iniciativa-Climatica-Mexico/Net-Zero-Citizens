import express from 'express'
import * as controller from '../controllers/complaint.controller'

const router = express.Router()

router.get('/', controller.getAllComplaints)
router.get('/:complaintId', controller.getComplaintById)
router.get('/company/:companyId', controller.getComplaintByCompany)
router.get('/user/:userId', controller.getComplaintByUser)

export default router

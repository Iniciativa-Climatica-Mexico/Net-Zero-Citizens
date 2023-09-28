import express from 'express'
import * as controller from '../controllers/complaint.controller'

const router = express.Router()

router.get('/', controller.getAllComplaints)
router.get('/:complaintId', controller.getComplaintById)
router.get('/company/:companyId', controller.getComplaintsByCompany)
router.get('/user/:userId', controller.getComplaintByUser)
router.post('/:userId/:companyId', controller.addComplaint)
router.put('/:complaintId', controller.updateComplaintStatus)

export default router

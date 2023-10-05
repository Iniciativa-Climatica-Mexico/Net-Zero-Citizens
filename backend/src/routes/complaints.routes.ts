import express from 'express'
import * as controller from '../controllers/complaint.controller'

const router = express.Router()

router.get('/', controller.getAllComplaints)
router.get('/user/:userId', controller.getComplaintByUser)
router.post('/create', controller.addComplaint)
router.put('/update', controller.updateComplaintStatus)
router.get('/complaints/:companyId', controller.getDetailsComplaintsByCompany)
router.get('/company/:companyId', controller.getComplaintsByCompany)
router.get('/:complaintId', controller.getComplaintById)

export default router

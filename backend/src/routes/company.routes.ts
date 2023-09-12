import express from 'express'
import * as controller from '../controllers/company.controller'

const router = express.Router()

router.get('/', controller.getAllCompanies)

router.get('/pending', controller.getPendingCompanies)

router.post('/pending/:companyId',controller.updateCompanyInfo)

router.get('/:companyId', controller.getCompanyInfo)

export default router

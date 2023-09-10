import express from 'express'
import * as controller from '../controllers/company.controller'

const router = express.Router()

router.get('/', controller.getAllCompanies)
router.post('/create', controller.createCompany)

export default router

import express from 'express'
import * as controller from '../controllers/company.controller'

const router = express.Router()

router.get('/', controller.getAllCompanies)
router.get('/:id', controller.getCompanyById)

export default router

import express from 'express'
import * as CompanyController from '../controllers/company.controller'
import * as CompanyImageController from '../controllers/companyImage.controller'

const router = express.Router()

router.get('/', CompanyController.getAllCompanies)
router.post('/create', CompanyController.createCompany)
router.get('/:id', controller.getCompanyById)

router.post('/add/product', CompanyController.addProduct)
router.post('/upload/image', CompanyImageController.uploadCompanyImage)

export default router

import express from 'express'
import * as CompanyController from '../controllers/company.controller'
import * as CompanyImageController from '../controllers/companyImage.controller'


const router = express.Router()

router.get('/', CompanyController.getAllCompanies)
router.post('/create', CompanyController.createCompany)

router.post('/add/product', CompanyController.addProduct)
router.post('/upload/image', CompanyImageController.uploadCompanyImage)

router.get('/pending', CompanyController.getPendingCompanies)

router.get('/geocoding', CompanyController.getCoordinates)

router.post('/pending/:companyId',CompanyController.updateCompanyInfo)

router.get('/:companyId', CompanyController.getCompanyInfo)

export default router

import express from 'express'
import * as CompanyController from '../controllers/company.controller'
import * as CompanyFilesController from '../controllers/companyFiles.controller'

const router = express.Router()

router.get('/', CompanyController.getAllCompanies)
router.post('/create', CompanyController.createCompany)

router.get('/files', CompanyFilesController.getCompanyFiles)
router.post('/add/product', CompanyController.addProduct)
router.post('/upload/image', CompanyFilesController.uploadCompanyImage)
router.post('/upload/file', CompanyFilesController.uploadCompanyFile)

router.get('/approved', CompanyController.getApprovedCompanies)

router.get('/pending', CompanyController.getPendingCompanies)
router.get('/geocoding', CompanyController.getCoordinates)

router.post('/pending/:companyId', CompanyController.updateCompanyInfo)

router.get('/:id', CompanyController.getCompanyById)

export default router

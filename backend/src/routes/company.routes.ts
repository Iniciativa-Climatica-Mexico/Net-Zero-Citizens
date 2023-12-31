import express from 'express'
import * as CompanyController from '../controllers/company.controller'
import * as CompanyFilesController from '../controllers/companyFiles.controller'
import upload from '../middlewares/multer.middleware'

const router = express.Router()

router.get('/', CompanyController.getAllCompanies)
router.post('/create', CompanyController.createCompany)

router.get('/files', CompanyFilesController.getCompanyFiles)
router.post('/upload/image', upload, CompanyFilesController.uploadCompanyImage)
router.post('/upload/file', upload, CompanyFilesController.uploadCompanyFile)

router.get('/approved', CompanyController.getApprovedCompanies)
router.get(
  '/approved/complaints',
  CompanyController.getApprovedCompaniesWithComplaints
)

router.get('/pending', CompanyController.getPendingCompanies)

router.get('/geocoding', CompanyController.getCoordinatesIos)
router.get('/geocoding/android', CompanyController.getCoordinatesAndroid)

router.get(
  '/download/file/:companyId/:fileDescription/:fileFormat',
  CompanyFilesController.downloadCompanyFile
)

router.post('/pending/:companyId', CompanyController.updateCompanyInfo)

router.put('/:companyId/assign', CompanyController.assignCompanyUser)
router.put('/:companyId/add/products', CompanyController.addProduct)
router.get('/:id', CompanyController.getCompanyById)

export default router

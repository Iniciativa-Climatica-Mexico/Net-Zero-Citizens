import express from 'express'
import * as controller from '../controllers/company.controller'

const router = express.Router()

router.get('/pending', controller.getPendingCompanies)

export default router
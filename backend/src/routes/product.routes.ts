import express from 'express'
import * as controller from '../controllers/product.controller'
const router = express.Router()

router.get('/', controller.getAllProducts)

export default router
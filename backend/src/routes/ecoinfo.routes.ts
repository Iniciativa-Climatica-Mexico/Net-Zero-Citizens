import express from 'express'
import * as controller from '../controllers/ecoinfo.controller'

const router = express.Router()

router.get('/', controller.getAllEcoinfos)

export default router

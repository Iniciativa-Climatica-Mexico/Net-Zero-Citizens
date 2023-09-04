import express from 'express'
import * as controller from '../controllers/dummy.controller'

const router = express.Router()

router.get('/', controller.getAllDummys)
router.get('/:name', controller.getGreeting)

export default router

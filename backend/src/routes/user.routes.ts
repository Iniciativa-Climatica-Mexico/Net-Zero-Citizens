import express from 'express'
import * as controller from '../controllers/users.controllers'

const router = express.Router()

router.get('/', controller.getAllUsers)
router.get('/:id', controller.getUser)

export default router

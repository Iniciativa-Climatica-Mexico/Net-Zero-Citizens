import express from 'express'
import * as controller from '../controllers/auth.controller'
const router = express.Router()

router.post('/login/credentials', controller.login)
router.post('/register/credentials', controller.register)
router.post('/login/google', controller.googleLogin)
router.post('/login/apple', controller.appleLogin)
router.post('/refresh', controller.updateTokens)
router.post('/update/tokens/data', controller.updateUserTokensData)

export default router
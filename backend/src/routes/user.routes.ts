import express from 'express'
import * as controller from '../controllers/users.controllers'

const usersRouter = express.Router()

usersRouter.get('/:userId', controller.getUserInfo)
usersRouter.put('/:userId', controller.updateUserInfo)
usersRouter.put('/credentials/:userId', controller.updateUserCredentials)

export default usersRouter

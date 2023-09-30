import express from 'express'
import * as controller from '../controllers/users.controllers'

const usersRouter = express.Router()

usersRouter.get('/:userId', controller.getUserInfo)
usersRouter.put('/:userId', controller.updateUserInfo)
usersRouter.put('/credentials/:userId', controller.updateUserCredentials)

usersRouter.get('/', controller.getAllUsers)
usersRouter.post('/create', controller.createUser)

usersRouter.delete('/delete/:userId', controller.deleteUserById)

export default usersRouter

import express from 'express'
import * as controller from '../controllers/users.controllers'

const usersRouter = express.Router()

//router.get('/', controller.getAllUsers)
usersRouter.get('/:userId', controller.getUserInfo)

usersRouter.put('/:userId', controller.updateUserInfo)


export default usersRouter

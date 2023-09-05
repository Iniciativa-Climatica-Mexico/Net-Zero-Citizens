import express from 'express'
import * as controller from '../controllers/users.controllers'

const usersRouter = express.Router()

//router.get('/', controller.getAllUsers)
usersRouter.get('/:userId', controller.getUserInfo)

//router.put('/:id', controller.updateUser)


export default usersRouter

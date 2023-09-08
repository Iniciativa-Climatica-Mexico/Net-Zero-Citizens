import express from 'express'
import * as controller from '../controllers/users.controllers'

const usersRouter = express.Router()

/**
 * @function getUserInfo
 * @param userId
 * @returns User or Null
 * @description Get user info by userId
 */
usersRouter.get('/:userId', controller.getUserInfo)

/**
 * @function updateUserInfo
 * @param userId
 * @returns User or Null
 * @description Update user info by userId
 * @example PUT /users/:userId
 */
usersRouter.put('/:userId', controller.updateUserInfo)
usersRouter.put('/credentials/:userId', controller.updateUserCredentials)


export default usersRouter

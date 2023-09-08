import * as UserService from '../services/users.service'
import { NoRecord, Paginator, PaginationParams } from '../utils/RequestResponse'
import { RequestHandler } from 'express'

/**
 * @function getUserInfo
 * @param userId
 * @returns User or Null
 * @description Get user info by userId
 * @example GET /users/:userId
 */

export const getUserInfo: RequestHandler<{ userId: string }> = async (
  req,
  res
) => {
  const userId = req.params.userId
  const userInfo = await UserService.getUserInfo(userId)

  if (userInfo) {
    res.json(userInfo)
  } else {
    res.status(200).status(404).json({ error: 'User not found' })
  }
}

/**
 * @brief
 * En espanol
 * The `updateUserInfo` function updates the user information based on the *
 * provided user ID and request
 * body, and returns a success message if the user is found, otherwise returns a 404 error message.
 * @param req - The `req` parameter is the request object that contains information about the incoming
 * HTTP request. It includes properties such as `params` (which contains route parameters), `body`
 * (which contains the request body), and `query` (which contains query parameters).
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to control the response, such as
 * setting the status code, headers, and sending the response body. In this code snippet, the `res`
 * object is
 */

export const updateUserInfo: RequestHandler<
  { userId: string },
  { message: string },
  UserService.UpdateUserInfoBody
> = async (req, res) => {
  const userId = req.params.userId
  const userInfo = await UserService.getUserInfo(userId)

  if (userInfo) {
    await UserService.updateUserInfo(userId, req.body)
    res.status(201).json({ message: 'User updated' })
  } else {
    res.status(404).json({ message: 'User not found' })
  }
}

export const updateUserCredentials: RequestHandler<
  { userId: string },
  { message: string },
  UserService.UpdateUserCredentials
> = async (req, res) => {
  const userId = req.params.userId
  const userInfo = await UserService.getUserInfo(userId)

  if (!userId || !userInfo) {
    res.status(400).json({ message: 'User not found' })
    return
  }

  if (userInfo) {
    await UserService.updateUserCredentials(userId, req.body)
    res.status(201).json({ message: 'User credentials updated' })
  } else {
    res.status(404).json({ message: 'User not found' })
  }
}

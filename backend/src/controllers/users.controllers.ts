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

export const getUserInfo: RequestHandler<{ userId: string }> = async (req, res) => {
  const userId = req.params.userId
  console.log(userId)
  const userInfo = await UserService.getUserInfo(userId)
  console.log(userInfo)

  if (userInfo) {
    res.json(userInfo)
  } else {
    res.status(404).json({ error: 'User not found' })
  }
}


export const updateUserInfo: RequestHandler<{ userId: string }> = async (req, res) => {
  const userId = req.params.userId
  const userInfo = await UserService.getUserInfo(userId)
  const newUserInfo = new UserService.User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    secondLastName: req.body.secondLastName,
    email: req.body.email,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber,
    age: req.body.age,
    state: req.body.state,
    sex: req.body.sex,
    profilePicture: req.body.profilePicture,
  })

  if (userInfo) {
    await UserService.updateUserInfo(userId, newUserInfo)
    res.json({ message: 'User updated' })
  } else {
    res.status(404).json({ error: 'User not found' })
  }

}

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
  const userInfo = await UserService.getUserInfo(userId)

  if (userInfo) {
    res.json(userInfo)
  } else {
    res.status(404).json({ error: 'User not found' })
  }
}


/*
export const getAllUsers: RequestHandler<
  NoRecord,
  Paginator<User>,
  NoRecord,
  PaginationParams<{}>
> = async (req, res) => {
  const params = {
    start: req.query.start || 0,
    pageSize: req.query.pageSize || 10,
    filters: { },
  }
  const users = await UserService.getAllUsers(params)
  res.json({
    rows: users.rows,
    start: params.start,
    pageSize: params.pageSize,
    total: users.count,
  })
}
*/

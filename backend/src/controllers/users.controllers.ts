import * as UserService from '../services/users.service'
import { NoRecord, Paginator, PaginationParams } from '../utils/RequestResponse'
import { RequestHandler } from 'express'
import { User } from '../models/users.model'

export const getUsers: RequestHandler<
  { id: string }
  
  > = async (req, res) => {
    const { id } = req.params
    res.json({ })
  }

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

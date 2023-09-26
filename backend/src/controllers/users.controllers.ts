import User from '../models/users.model'
import * as UserService from '../services/users.service'
import { NoRecord, Paginator, PaginationParams } from '../utils/RequestResponse'
import { RequestHandler } from 'express'

/**
 * @brief
 * Función del controlador que devuelve todos los usuarios
 * de la base de datos
 * @param req La request HTTP al servidor
 * @param res Un objeto paginador con los usuarios y la
 *            información de paginación
 */
export const getAllUsers: RequestHandler<
  NoRecord,
  Paginator<User> | { error: string },
  NoRecord,
  PaginationParams<{ name?: string }>
> = async (req, res) => {
  const params = {
    start: req.query.start || 0,
    pageSize: req.query.pageSize || 1000,
    filters: {
      name: req.query.name || '',
    },
  }

  try {
    const users = await UserService.getAllUsers(params)
    res.json({
      rows: users.rows,
      start: params.start,
      pageSize: params.pageSize,
      total: users.count,
    })
  } catch (error) {
    res.status(400).json({ error: 'Error getting users' })
  }
}

/**
 * @brief
 * Función del controlador para registrar un nuevo usuario
 * @param req La request HTTP al servidor
 * @param res Un objeto paginador con los usuarios
 */

export const createUser: RequestHandler<
  NoRecord,
  { userId: string; message?: string; error?: string },
  { user: User },
  NoRecord
> = async (req, res) => {
  try {
    if (!req.body.user)
      res.status(400).json({ userId: '', error: 'Missing user data' })
    const user = req.body.user
    const newUser = await UserService.createUser(user)

    if (!newUser)
      res.status(400).json({ userId: '', error: 'Error creating user' })

    res.json({ userId: newUser?.dataValues.userId, message: 'User created' })
  } catch (error) {
    res.status(400).json({ userId: '', error: 'Error creating user' })
  }
}

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

  try {
    if (userInfo) {
      res.json(userInfo)
    } else {
      res.status(200).status(404).json({ error: 'User not found' })
    }
  } catch (error) {
    res.status(400).json({ error: 'Error getting user' })
  }
}

/**
 * @brief Función del controlador para actualizar la información de un usuario
 * @param req -> userId, body
 * @param res -> message
 */

export const updateUserInfo: RequestHandler<
  { userId: string },
  { message: string },
  UserService.UpdateUserInfoBody
> = async (req, res) => {
  const userId = req.params.userId
  try {
    const userInfo = await UserService.getUserInfo(userId)

    if (userInfo) {
      await UserService.updateUserInfo(userId, req.body)
      res.status(201).json({ message: 'User updated' })
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'Error updating user' })
  }
}

/**
 * @brief Función del controlador para actualizar las credenciales de un usuario
 * @param req -> userId, body
 * @param res -> message
 * @returns
 */

export const updateUserCredentials: RequestHandler<
  { userId: string },
  { message: string },
  UserService.UpdateUserCredentials
> = async (req, res) => {
  const userId = req.params.userId

  try {
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
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'Error updating user credentials' })
  }
}

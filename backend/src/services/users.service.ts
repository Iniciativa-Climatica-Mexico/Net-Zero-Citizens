import { UsersModel, User } from '../models/users.model'
import { PaginatedQuery, PaginationParams } from '../utils/RequestResponse'

/**
 * @function getAllUsers
 * @param userId
 * @returns User or Null
 */
export const getUserInfo = async (userId: string): Promise<User | null> => {
  return await UsersModel.findByPk(userId)
}

export type UpdateUserInfoBody = {
  firstName: string
  lastName: string
  secondLastName?: string
  phoneNumber: string
  age: number
  state: string
  sex: 'masculine' | 'femenine' | 'other' | 'no_answer'
  profilePicture?: string
}

export const updateUserInfo = async (
  userId: string,
  newUserInfo: UpdateUserInfoBody
): Promise<User | null> => {
  const allowedKeys = [
    'firstName',
    'lastName',
    'secondLastName',
    'phoneNumber',
    'age',
    'state',
    'sex',
    'profilePicture',
  ]
  const userInfo = await UsersModel.findByPk(userId)
  if (userInfo) {
    await userInfo.update(newUserInfo)
    return userInfo
  } else {
    return null
  }
}

export type UpdateUserCredentials = {
  email: string
  password: string
}

export const updateUserCredentials = async (
  userId: string,
  newUserCredentials: UpdateUserCredentials
): Promise<User | null> => {
  const userInfo = await UsersModel.findByPk(userId)
  if (userInfo) {
    await userInfo.update(newUserCredentials)
    return userInfo
  } else {
    return null
  }
}
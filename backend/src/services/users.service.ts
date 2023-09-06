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
}
export const updateUserInfo = async (
  userId: string,
  newUserInfo: UpdateUserInfoBody
): Promise<User | null> => {
  const userInfo = await UsersModel.findByPk(userId)
  if (userInfo) {
    await userInfo.update(newUserInfo)
    return userInfo
  } else {
    return null
  }
}

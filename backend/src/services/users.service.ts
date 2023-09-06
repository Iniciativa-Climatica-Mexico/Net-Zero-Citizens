import { UserModel, User } from '../models/users.model'
import { PaginatedQuery, PaginationParams } from '../utils/RequestResponse'

/**
 * @function getAllUsers
 * @param userId 
 * @returns User or Null
 */
export const getUserInfo = async (userId: string): Promise<User | null> => {
  return await UserModel.findByPk(userId)
}

export const updateUserInfo = async (userId: string, newUserInfo: User): Promise<User | null> => {
  const userInfo = await UserModel.findByPk(userId)
  if (userInfo) {
    await userInfo.update(newUserInfo)
    return userInfo
  } else {
    return null
  }
}

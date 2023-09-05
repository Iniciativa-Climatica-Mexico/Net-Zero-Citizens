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

import User from '../models/users.model'
import Role from '../models/role.model'

/**
 * @function getAllUsers
 * @param userId
 * @returns User or Null
 */
export const getUserInfo = async (userId: string): Promise<User | null> => {
  return await User.findByPk(userId)
}

/**
 * @function getUserByEmailWithRole
 * @param email User's email
 * @returns User with role or Null
 */
export const getUserByEmailWithRole = async (email: string): Promise<User | null> => {
  return await User.findOne({
    where: { email },
    include: [
      {
        model: Role,
        as: 'role',
        attributes: ['ROLE_ID', 'NAME']
      }
    ]
  })        
}

export type UpdateUserInfoBody = {
  roleId: string,
  companyId?: string | null,
  googleId?: string | null,
  facebookId?: string | null,
  appleId?: string | null,
  firstName: string
  lastName: string
  secondLastName?: string | null,
  phoneNumber: string
  age: number
  state: string
  gender: 'masculine' | 'femenine' | 'other' | 'no_answer'
  profilePicture?: string | null,
  deviceToken?: string | null
}

export const updateUserInfo = async (
  userId: string,
  newUserInfo: UpdateUserInfoBody
): Promise<User | null> => {
  const userInfo = await User.findByPk(userId)
  if (userInfo) {
    console.log(newUserInfo)
    return userInfo.update(newUserInfo)
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
  const userInfo = await User.findByPk(userId)
  if (userInfo) {
    return userInfo.update(newUserCredentials)
  } else {
    return null
  }
}

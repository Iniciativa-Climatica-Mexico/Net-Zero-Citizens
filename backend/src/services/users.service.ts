import User from '../models/users.model'

/**
 * @function getAllUsers
 * @param userId
 * @returns User or Null
 */
export const getUserInfo = async (userId: string): Promise<User | null> => {
  return await User.findByPk(userId)
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
  const userInfo = await User.findByPk(userId)
  if (userInfo) {
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

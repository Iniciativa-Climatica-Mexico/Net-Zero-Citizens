import User from '../models/users.model'
import { PaginatedQuery, PaginationParams } from '../utils/RequestResponse'
import Role from '../models/role.model'

//TYPES
/**
 * @brief
 * Tipo de dato del usuario
 */

export type UserType = {
  userId?: string
  roleId?: string
  companyId?: string | null
  googleId?: string | null
  facebookId?: string | null
  appleId?: string | null
  firstName: string
  lastName: string
  secondLastName?: string | null
  email: string
  password?: string | null
  phoneNumber: string | null
  age: number
  state: string
  gender: string
  profilePicture?: string | null
}

/**
 * @brief
 * Tipo de dato para el género del usuario
 */
export type Gender = 'masculine' | 'femenine' | 'other' | 'no_answer'

/**
 * @brief
 * Función del servicio que devuelve todos los usuarios de la base de datos
 * @param params Los parametros de paginación
 * @returns Una promesa con los usuarios y la información de paginación
 */
export const getAllUsers = async <T>(
  params: PaginationParams<T>
): Promise<PaginatedQuery<User>> => {
  return await User.findAndCountAll({
    limit: params.pageSize,
    offset: params.start,
  })
}

/**
 * @brief
 * Función del servicio para crear una nuevo usuario
 * @param user El user que se va a crear
 * @returns Una promesa con el nuevo usuario
 */
export const createUser = async (user: UserType): Promise<User | null> => {
  return await User.create(user)
}

/**
 * @function getUserInfo
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
export const getUserByEmailWithRole = async (
  email: string
): Promise<User | null> => {
  return await User.findOne({
    where: { email },
    include: [
      {
        model: Role,
        as: 'role',
        attributes: ['ROLE_ID', 'NAME'],
      },
    ],
  })
}

/**
 * @brief Servicio para obtener un usuario segun el companyId
 * @param companyId
 * @returns User or Null
 */

export const getUserCompany = async (companyId: string): Promise<User | null> => {
  return await User.findOne({
    where: { companyId },
  })
}

export type UpdateUserInfoBody = {
  roleId: string
  companyId?: string | null
  googleId?: string | null
  facebookId?: string | null
  appleId?: string | null
  firstName: string
  lastName: string
  secondLastName?: string | null
  phoneNumber: string
  age: number
  state: string
  gender: 'masculine' | 'femenine' | 'other' | 'no_answer'
  profilePicture?: string | null
  deviceToken?: string | null
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

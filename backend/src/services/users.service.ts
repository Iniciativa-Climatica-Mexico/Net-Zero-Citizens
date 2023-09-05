import { UserModel, User } from '../models/users.model'
import { PaginatedQuery, PaginationParams } from '../utils/RequestResponse'

export const getUser = async (id: string): Promise<string> => {
  const user = await UserModel.findOne({ where: { id } })

  if (user) {
    console.log(user)
    return `Hello ${user.firstName} ${user.lastName}!`
  } 
  
  else {
    console.log('Dummy not found')
    return `Hello ${name}!`
  }
}

export const getAllUsers = async <T>(
  params: PaginationParams<T>
): Promise<PaginatedQuery<User>> => {
  return await UserModel.findAndCountAll({
    limit: params.pageSize,
    offset: params.start,
  })
}

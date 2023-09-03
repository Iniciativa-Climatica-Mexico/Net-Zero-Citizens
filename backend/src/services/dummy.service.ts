import { DummyModel, Dummy } from '../models/dummy.model'
import { PaginatedQuery, PaginationParams } from '../utils/RequestResponse'

export const getGreeting = async (name: string): Promise<string> => {
  const dummy = await DummyModel.findOne({ where: { name } })
  if (dummy) {
    console.log(dummy)
    return `Hello ${dummy.name} ${dummy.lastName}!`
  } else {
    console.log('Dummy not found')
    return `Hello ${name}!`
  }
}

export const getAllDummys = async <T>(
  params: PaginationParams<T>
): Promise<PaginatedQuery<Dummy>> => {
  return await DummyModel.findAndCountAll({
    limit: params.pageSize,
    offset: params.start,
  })
}

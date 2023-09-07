<<<<<<< HEAD
import { literal } from 'sequelize'
import { DummyModel, Dummy } from '../models/dummy.model'
=======
import { DummiesModel, Dummy } from '../models/dummy.model'
>>>>>>> main
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

export const getAllDummys = async (
  params: PaginationParams<{ name?: string }>
): Promise<PaginatedQuery<Dummy>> => {
<<<<<<< HEAD
  return await DummyModel.findAndCountAll({
=======
  const { name } = params
  const filters: { name?: string } = {}
  if (name) {
    filters.name = name
  }

  return await DummiesModel.findAndCountAll({
>>>>>>> main
    limit: params.pageSize,
    offset: params.start,
    // Case insensitive search
    // where: literal(`LOWER(name) LIKE LOWER('%${params.name}%')`),
    where: filters,
  })
}

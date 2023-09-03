import { Dummy } from '../models/dummy.model'

export const getGreeting = async (name: string): Promise<string> => {
  const dummy = await Dummy.findOne({ where: { name } })
  if (dummy) {
    console.log(dummy)
    return `Hello ${dummy.name} ${dummy.lastName}!`
  } else {
    console.log('Dummy not found')
    return `Hello ${name}!`
  }
}

import * as DummyModel from '../models/dummy.model'

export const getGreeting = async (name: string): Promise<string> => {
  return DummyModel.getGreeting(name)
}

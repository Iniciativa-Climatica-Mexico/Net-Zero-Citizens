import chai from 'chai'
import chaiExclude from 'chai-exclude'
import { db, initDB } from '../src/configs/database.config'
import {
  addFavourite,
  deleteFavouriteById,
} from '../src/services/favourite.service'
import Company from '../src/models/company.model'
import User from '../src/models/users.model'
import Favourite from '../src/models/favourite.model'

chai.use(chaiExclude)

const { expect } = chai
const testData = [
  {
    favouriteId: '550e8400-e29b-41d4-a716-446655440000',
    companyId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
    userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b8',
    savedAt: new Date(),
  },
]

const attributesToExclude = ['createdAt', 'updatedAt']

const mockFavourite = {
  favouriteId: '550e8400-e29b-41d4-a716-446655440000',
  companyId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
  userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b8',
  savedAt: new Date(),
}

beforeEach(async () => {
  await db.drop()
  await initDB()
})

describe('Favourite Service', () => {
  it('should return favourite instance', async () => {
    const response = await addFavourite(mockFavourite)
    expect(response?.get())
      .excludingEvery(attributesToExclude)
      .to.deep.equal(testData[0])
  })

  it('should return row affected when deleting', async () => {
    const response = await addFavourite(mockFavourite)
    const responseRowAffected = await deleteFavouriteById(
      response?.get().favouriteId
    )
    expect(responseRowAffected).equal(1)
  })
})

import chai from 'chai'
import chaiExclude from 'chai-exclude'
import { db, initDB } from '../src/configs/database.config'
import * as FavouriteService from '../src/services/favourite.service'

import { unwrap } from './utils'

chai.use(chaiExclude)

const { expect } = chai
const testData = [
  {
    favouriteId: '7a91f1c9-7a29-4a4e-80d8-57e8f0e709b6',
    companyId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
    userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b9',
  },
  {
    favouriteId: 'f5b7b3c8-2675-4b7b-bc8a-3af3cabb2f13',
    companyId: 'a2c0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
    userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b9',
  },
]

const attributesToExclude = ['createdAt', 'updatedAt', 'company']

beforeEach(async () => {
  await db.drop()
  await initDB()
})

describe('Favourite Service', () => {
  const newFavourite = {
    favouriteId: '7a91f1c9-7a29-4a4e-80d8-57e8f0e709b6',
    companyId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
    userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b9',
  }
  it('should return favourite instance', async () => {
    const response = await FavouriteService.addFavourite(newFavourite)
    console.log(response?.get())
    expect(response?.get())
      .excluding(attributesToExclude)
      .to.deep.equal(testData[0])
  })

  it('should return row affected when deleting', async () => {
    const responseRowAffected = await FavouriteService.deleteFavouriteById(
      'a2c0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
      '8de45630-2e76-4d97-98c2-9ec0d1f3a5b9'
    )
    expect(responseRowAffected).equal(1)
  })

  it('should return Favourite rows', async () => {
    const response = await FavouriteService.getAllFavouritesByUser({
      start: 0,
      pageSize: 10,
      userId: testData[0].userId,
    })
    console.log(response)
    expect(unwrap(response).rows)
      .excluding(attributesToExclude)
      .to.deep.equal([testData[1]])
  })

  it('should return Favourite if exists', async () => {
    const response = await FavouriteService.getFavouriteById(
      testData[1].favouriteId
    )
    console.log(response)
    expect(unwrap(response))
      .excluding([...attributesToExclude, 'company'])
      .to.deep.equal(testData[1])
  })
})

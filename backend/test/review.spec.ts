import chai from 'chai'
import chaiExclude from 'chai-exclude'
import { db, initDB } from '../src/configs/database.config'
import { getAllReviews } from '../src/services/review.service'
import { unwrap } from './utils'

chai.use(chaiExclude)
const { expect } = chai

const testData = [
  {
    reviewId: 'd349a4d4-595c-11ee-8c99-0242ac120000',
    userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b8',
    companyId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
    reviewTitle: 'This is a review title',
    score: 5,
    review: 'This is a comment',
  },
  {
    reviewId: 'd349a4d4-595c-11ee-8c99-0242ac120001',
    userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b9',
    companyId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
    reviewTitle: 'This is a review title',
    score: 4,
    review: 'This is a comment',
  },
  {
    reviewId: 'd349a4d4-595c-11ee-8c99-0242ac120002',
    userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b9',
    companyId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
    reviewTitle: 'This is a review title',
    score: 4,
    review: 'This is a comment',
  },
  {
    reviewId: 'd349a4d4-595c-11ee-8c99-0242ac120003',
    userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b9',
    companyId: 'a2b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
    reviewTitle: 'This is a review title',
    score: 3,
    review: 'This is a comment',
  },
  {
    reviewId: 'd349a4d4-595c-11ee-8c99-0242ac120004',
    userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b9',
    companyId: 'a2b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
    reviewTitle: 'This is a review title',
    score: 2,
    review: 'This is a comment',
  },
]

const attributesToExclude = ['createdAt', 'updatedAt']

beforeEach(async () => {
  await db.drop()
  await initDB()
})

describe('Review Service', () => {
  it('should return a list of all reviews', async () => {
    const response = await getAllReviews({ start: 0, pageSize: 10 })
    expect(unwrap(response).rows)
      .excluding(attributesToExclude)
      .to.deep.equal(testData)
  })
})

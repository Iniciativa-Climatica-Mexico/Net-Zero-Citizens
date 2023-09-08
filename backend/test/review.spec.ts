import chai from 'chai'
import chaiExclude from 'chai-exclude'
import { db, initDB } from '../src/configs/database.config'
import { getAllReviews, getReviewById } from '../src/services/review.service'
import { unwrap } from './utils'

chai.use(chaiExclude)
const { expect } = chai

const testData = [
    {
        reviewId: 'revw-1234-efgh-0000',
        userId: 'abcd-1234-efgh-5678',
        companyId: 'comp-1234-efgh-0000',
        rating: 5,
        comment: 'This is a comment',
      },
      {
        reviewId: 'revw-1234-efgh-0001',
        userId: 'abcd-1234-efgh-5679',
        companyId: 'comp-1234-efgh-0000',
        rating: 5,
        comment: 'This is a comment',
    }
]

const attributesToExclude = [
  'createdAt',
  'updatedAt',
]

beforeEach(async () => {
  await initDB()
})

afterEach(async () => {
  await db.drop()
})

describe('Review Service', () => {
  it('should return a list of all reviews', async () => {
    const response = await getAllReviews({ start: 0, pageSize: 10 })
    expect(unwrap(response).rows)
      .excluding(attributesToExclude)
      .to.deep.equal(testData)
  })
})
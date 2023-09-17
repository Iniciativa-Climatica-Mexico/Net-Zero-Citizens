import chai from 'chai'
import chaiExclude from 'chai-exclude'
import { db, initDB } from '../src/configs/database.config'
import { getAllReviews } from '../src/services/review.service'
import { unwrap } from './utils'

chai.use(chaiExclude)
const { expect } = chai

const testData = [
  {
    reviewId: 'revw-1234-efgh-0000',
    userId: 'abcd-1234-efgh-5678',
    companyId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
    rating: 5,
    comment: 'This is a comment',
  },
  {
    reviewId: 'revw-1234-efgh-0001',
    userId: 'abcd-1234-efgh-5679',
    companyId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
    rating: 4,
    comment: 'This is a comment',
  },
  {
    reviewId: 'revw-1234-efgh-0002',
    userId: 'abcd-1234-efgh-5679',
    companyId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
    rating: 4,
    comment: 'This is a comment',
  },
  {
    reviewId: 'revw-1234-efgh-0003',
    userId: 'abcd-1234-efgh-5679',
    companyId: 'a2b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
    rating: 3,
    comment: 'This is a comment',
  },
  {
    reviewId: 'revw-1234-efgh-0004',
    userId: 'abcd-1234-efgh-5679',
    companyId: 'a2b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
    rating: 2,
    comment: 'This is a comment',
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

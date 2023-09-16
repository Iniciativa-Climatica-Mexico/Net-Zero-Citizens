import Review from '../models/review.model'
import { Bootstrapper } from './Bootstraper'
export default class ReviewBootstrap extends Bootstrapper {
  async run() {
    await Review.bulkCreate([
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
    ])
  }
}

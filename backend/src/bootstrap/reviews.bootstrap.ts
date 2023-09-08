import Review from '../models/review.model'
import { Bootstrapper } from './Bootstraper'
export default class ReviewBootstrap extends Bootstrapper {
  async run() {
    Review.bulkCreate([
      {
        reviewId: 'revw-1234-efgh-0000',
        userId: 'abcd-1234-efgh-5678',
        companyId: '9b1d7e8a-fa5d-4e63-a5ca-6f7d40f1a2c8',
        rating: 5,
        comment: 'This is a comment',
      },
      {
        reviewId: 'revw-1234-efgh-0001',
        userId: 'abcd-1234-efgh-5679',
        companyId: '9b1d7e8a-fa5d-4e63-a5ca-6f7d40f1a2c8',
        rating: 5,
        comment: 'This is a comment',
      },
    ])
  }
}

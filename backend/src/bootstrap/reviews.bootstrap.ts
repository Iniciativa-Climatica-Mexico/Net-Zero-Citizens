import Review from '../models/review.model'
import { Bootstrapper } from './Bootstraper'
export default class ReviewBootstrap extends Bootstrapper {
  async run() {
    Review.bulkCreate([
      {
        reviewId: 'revw-1234-efgh-0000',
        userId: '0cca9c89-c38e-4350-ae31-9215741c8f11',
        companyId: 'comp-1234-efgh-0000',
        rating: 5,
        comment: 'This is a comment',
      },
      {
        reviewId: 'revw-1234-efgh-0001',
        userId: '0cca9c89-c38e-4350-ae31-9215741c8f11',
        companyId: 'comp-1234-efgh-0000',
        rating: 5,
        comment: 'This is a comment',
      },
    ])
  }
}

import Review from '../models/review.model'
import { Bootstrapper } from './Bootstraper'
export default class ReviewBootstrap extends Bootstrapper {
  async run() {
    Review.bulkCreate([
      {
        reviewId: 'revw-1234-efgh-0000',
        userId: 'abcd-1234-efgh-5687',
        companyId: 'comp-1234-efgh-0008',
        rating: 5,
        comment: 'This is a comment',
      },
      {
        reviewId: 'revw-1234-efgh-0001',
        userId: 'abcd-1234-efgh-5688',
        companyId: 'comp-1234-efgh-0009',
        rating: 5,
        comment: 'This is a comment',
      },
    ])
  }
}

import Review from '../models/review.model'
import { Bootstrapper } from './Bootstraper'
export default class ReviewBootstrap extends Bootstrapper {
  async run() {
    Review.bulkCreate([
      {
        reviewId: 'revw-1234-efgh-0000',
        userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b8',
        companyId: 'comp-1234-efgh-0000',
        rating: 5,
        comment: 'This is a comment',
      },
      {
        reviewId: 'revw-1234-efgh-0001',
        userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b9',
        companyId: 'comp-1234-efgh-0000',
        rating: 5,
        comment: 'This is a comment',
      },
    ])
  }
}

import Review from '../models/review.model'
import { Bootstrapper } from './Bootstraper'
export default class ReviewBootstrap extends Bootstrapper {
  async run() {
    Review.bulkCreate([
      {
        reviewId: 'revw-1234-efgh-0000',
        UUID: 'abcd-1234-efgh-5678',
        companyId: 'comp-1234-efgh-0000',
        score: 5,
        review: 'This is a comment',
      },
      {
        reviewId: 'revw-1234-efgh-0001',
        UUID: 'abcd-1234-efgh-5679',
        companyId: 'comp-1234-efgh-0000',
        score: 5,
        review: 'This is a comment',
      },
    ])
  }
}

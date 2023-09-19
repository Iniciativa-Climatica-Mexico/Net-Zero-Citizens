import Review from '../models/review.model'
import { Bootstrapper } from './Bootstraper'
export default class ReviewBootstrap extends Bootstrapper {
  async run() {
    await Review.bulkCreate([
      {
        reviewId: 'revw-1234-efgh-0000',
        userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b8',
        companyId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        reviewTitle: 'This is a review title',
        rating: 5,
        comment: 'This is a comment',
      },
      {
        reviewId: 'revw-1234-efgh-0001',
        userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b9',
        companyId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        reviewTitle: 'This is a review title',
        rating: 4,
        comment: 'This is a comment',
      },
      {
        reviewId: 'revw-1234-efgh-0002',
        userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b9',
        companyId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        reviewTitle: 'This is a review title',
        rating: 4,
        comment: 'This is a comment',
      },
      {
        reviewId: 'revw-1234-efgh-0003',
        userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b9',
        companyId: 'a2b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        reviewTitle: 'This is a review title',
        rating: 3,
        comment: 'This is a comment',
      },
      {
        reviewId: 'revw-1234-efgh-0004',
        userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b9',
        companyId: 'a2b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        reviewTitle: 'This is a review title',
        rating: 2,
        comment: 'This is a comment',
      },
    ])
  }
}

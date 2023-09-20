import Review from '../models/review.model'
import { Bootstrapper } from './Bootstraper'
export default class ReviewBootstrap extends Bootstrapper {
  async run() {
    await Review.bulkCreate([
      {
        reviewId: "8de45630-2e76-4d97-98c2-9ec0d1f3a5b0",
        userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b8',
        companyId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        reviewTitle: 'This is a review title',
        score: 5,
        review: 'This is a comment',
      },
      {
        reviewId: "8de45630-2e76-4d97-98c2-9ec0d1f3a5b1",
        userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b9',
        companyId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        reviewTitle: 'This is a review title',
        score: 4,
        review: 'This is a comment',
      },
      {
        reviewId: "8de45630-2e76-4d97-98c2-9ec0d1f3a5b2",
        userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b9',
        companyId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        reviewTitle: 'This is a review title',
        score: 4,
        review: 'This is a comment',
      },
      {
        reviewId: "8de45630-2e76-4d97-98c2-9ec0d1f3a5b3",
        userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b9',
        companyId: 'a2b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        reviewTitle: 'This is a review title',
        score: 3,
        review: 'This is a comment',
      },
      {
        reviewId: "8de45630-2e76-4d97-98c2-9ec0d1f3a5b4",
        userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b9',
        companyId: 'a2b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        reviewTitle: 'This is a review title',
        score: 2,
        review: 'This is a comment',
      },
    ])
  }
}

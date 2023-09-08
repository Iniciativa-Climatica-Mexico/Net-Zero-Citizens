import { ReviewModel } from '../models/review.model'
import { Bootstrapper } from './Bootstraper'
export default class CompanyBootstrap extends Bootstrapper {
  async run() {
      ReviewModel.bulkCreate([
        {
            reviewId: 1,
            userId: 'abcd-1234-efgh-5678',
            companyId: 1,
            rating: 5,
            comment: 'This is a comment',
        },
        {
            reviewId: 2,
            userId: 'abcd-1234-efgh-5679',
            companyId: 2,
            rating: 5,
            comment: 'This is a comment',
          },
      ])    
  }
}

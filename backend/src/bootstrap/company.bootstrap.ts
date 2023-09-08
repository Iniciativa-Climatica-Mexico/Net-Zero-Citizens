import { CompaniesModel } from '../models/company.model'
import { Bootstrapper } from './Bootstraper'

export default class CompanyBootstrap extends Bootstrapper {
  async run() {
    CompaniesModel.bulkCreate([
      {
        userId: 1,
        name: 'Company 1',
        description: 'Company 1 description',
        email: 'example1@mail.com',
        location: 'Company 1 location',
        status: 'approved',
        phoneNumber: '123456789',
      },
      {
        userId: 2,
        name: 'Company 2',
        description: 'Company 2 description',
        email: 'example2@mail.com',
        location: 'Company 2 location',
        status: 'approved',
        phoneNumber: '1244598349',
      },
      {
        userId: 3,
        name: 'Company 3',
        description: 'Company 3 description',
        email: 'example3@mail.com',
        location: 'Company 3 location',
        status: 'pending_approval',
        phoneNumber: '8345858931',
      },
      {
        userId: 4,
        name: 'Company 4',
        description: 'Company 4 description',
        email: 'example4@mail.com',
        location: 'Company 4 location',
        status: 'rejected',
        phoneNumber: '548593485',
      },
    ])
  }
}

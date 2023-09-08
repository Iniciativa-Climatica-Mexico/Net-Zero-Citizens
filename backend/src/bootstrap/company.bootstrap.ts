import { CompaniesModel } from '../models/company.model'
import { Bootstrapper } from './Bootstraper'

export default class CompanyBootstrap extends Bootstrapper {
  async run() {
    CompaniesModel.bulkCreate([
      {
        companyId: '9b1d7e8a-fa5d-4e63-a5ca-6f7d40f1a2c8',
        userId: 'abcd-1234-efgh-5678',
        name: 'Company 1',
        description: 'Company 1 description',
        email: 'example1@mail.com',
        location: 'Company 1 location',
        status: 'approved',
        phoneNumber: '123456789',
      },
      {
        companyId: '7b6d3d5d-541a-4c81-9a9f-6ae8e58fb6d1',
        userId: 'abcd-1234-efgh-5678',
        name: 'Company 2',
        description: 'Company 2 description',
        email: 'example2@mail.com',
        location: 'Company 2 location',
        status: 'approved',
        phoneNumber: '1244598349',
      },
      {
        companyId: 'f04e8a88-7a17-4a9d-9b3c-ee7f7d894b3e',
        name: 'Company 3',
        description: 'Company 3 description',
        email: 'example3@mail.com',
        location: 'Company 3 location',
        status: 'pending_approval',
        phoneNumber: '8345858931',
      },
      {
        companyId: 'b0b7e8a2-63db-42c0-84d1-45e85b312fe5',
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

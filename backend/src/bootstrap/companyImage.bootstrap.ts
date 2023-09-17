import { Bootstrapper } from './Bootstraper'
import CompanyImage from '../models/companyImages.model'

export default class CompanyImageBootstrap extends Bootstrapper {
  async run() {
    CompanyImage.bulkCreate([
      {
        companyImageId: 'prod-1234-efgh-0000',
        companyId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        imageUrl: 'https://picsum.photos/200',
        altText: 'Solar Panel XYZ',
      },
      {
        companyImageId: 'prod-1235-efgh-0000',
        companyId: 'a2b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        imageUrl: 'https://picsum.photos/100',
        altText: 'Solar Heater IJK',
      },
    ])
  }
}
import { Bootstrapper } from './Bootstraper'
import CompanyImage from '../models/companyImage.model'

export default class ProductImageBootstrap extends Bootstrapper {
  async run() {
    CompanyImage.bulkCreate([
      {
        companyImageId: 'prod-1234-efgh-0000',
        companyId: 'comp-1234-efgh-0000',
        imageUrl: 'https://picsum.photos/200',
        altText: 'Solar Panel XYZ',
      },
      {
        companyImageId: 'prod-1235-efgh-0000',
        companyId: 'comp-5678-efgh-0000',
        imageUrl: 'https://picsum.photos/100',
        altText: 'Solar Heater IJK',
      },
    ])
  }
}
import { Bootstrapper } from './Bootstraper'
import CompanyImage from '../models/companyFiles.model'

export default class CompanyImageBootstrap extends Bootstrapper {
  async run() {
    CompanyImage.bulkCreate([
      {
        companyImageId: 'prod-1234-efgh-0000',
        companyId: 'comp-1234-efgh-0009',
        imageUrl: 'https://picsum.photos/200',
        altText: 'Solar Panel XYZ',
      },
      {
        companyImageId: 'prod-1235-efgh-0000',
        companyId: 'comp-1234-efgh-0009',
        imageUrl: 'https://picsum.photos/100',
        altText: 'Solar Heater IJK',
      },
    ])
  }
}

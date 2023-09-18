import CompanyImages from '../models/companyImages.model'
import { Bootstrapper } from './Bootstraper'

export default class CompanyImagesBootstrap extends Bootstrapper {
  async run() {
    await CompanyImages.bulkCreate([
      {
        companyImageId: 'ci01e4e0-d6e2-11eb-b8bc-0242ac130003',
        companyId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        imageUrl: 'https://www.company1.com/profilePicture.png',
        altText: 'Company 1 profile picture',
      },
      {
        companyImageId: 'ci01e4e0-d6e2-11eb-b8bc-0242ac130004',
        companyId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        imageUrl: 'https://www.company1.com/solarPanels.png',
        altText: 'Company 1 Solar Panel',
      },
      {
        companyImageId: 'ci01e4e0-d6e2-11eb-b8bc-0242ac130005',
        companyId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        imageUrl: 'https://www.company1.com/warehouse.png',
        altText: 'Company 1 warehouse',
      },
    ])
  }
}

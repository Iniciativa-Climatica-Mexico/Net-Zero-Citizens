import CompanyProducts from '../models/companyProducts.model'
import { Bootstrapper } from './Bootstraper'

export default class CompanyProductsBootstrap extends Bootstrapper {
  async run() {
    await CompanyProducts.bulkCreate([
      {
        companyProductId: 'e1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        productId: 'd1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        companyId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        pdfProductCertificationUrl:
          'https://www.company1.com/product1Certification.pdf',
      },
      {
        companyProductId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        productId: 'd2b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        companyId: 'a2c0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        pdfProductCertificationUrl:
          'https://www.company2.com/product2Certification.pdf',
      },
    ])
  }
}

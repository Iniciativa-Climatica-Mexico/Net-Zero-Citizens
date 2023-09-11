import CompanyProduct from '../models/companyProduct.model'
import { Bootstrapper } from './Bootstraper'

export default class CompanyProductBootstrap extends Bootstrapper {
  async run() {
    CompanyProduct.bulkCreate([
      {
        companyProductId: 'comp-prod-1234-efgh-0000',
        companyId: 'comp-1234-efgh-0000',
        productId: 'prod-1234-efgh-0000',
        pdfProductCertificationUrl: 'https://picsum.photos/100',
      },
      {
        companyProductId: 'comp-prod-1235-efgh-0000',
        companyId: 'comp-1234-efgh-0000',
        productId: 'prod-1235-efgh-0000',
        pdfProductCertificationUrl: 'https://picsum.photos/200',
      },
      {
        companyProductId: 'comp-prod-1236-efgh-0000',
        companyId: 'comp-5678-efgh-0000',
        productId: 'prod-1234-efgh-0000',
        pdfProductCertificationUrl: 'https://picsum.photos/300',
      },
      {
        companyProductId: 'comp-prod-1237-efgh-0000',
        companyId: 'comp-5678-efgh-0000',
        productId: 'prod-1235-efgh-0000',
        pdfProductCertificationUrl: 'https://picsum.photos/400',
      },
    ])
  }
}
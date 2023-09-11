import Product from '../models/product.model'
import { Bootstrapper } from './Bootstraper'

export default class ProductBootstrap extends Bootstrapper {
  async run() {
    Product.bulkCreate([
      {
        productId: 'prod-1234-efgh-0000',
        companyId: 'comp-1234-efgh-0000',
        name: 'Solar Panel XYZ',
        description: 'Solar Panel XYZ description',
        pdfProductCertificationUrl: 'https://picsum.photos/200',
      },
      {
        productId: 'prod-1235-efgh-0000',
        companyId: 'comp-5678-efgh-0000',
        name: 'Solar Heater IJK',
        description: 'Solar Heater IJK description',
        pdfProductCertificationUrl: 'https://picsum.photos/100',
      },
    ])
  }}
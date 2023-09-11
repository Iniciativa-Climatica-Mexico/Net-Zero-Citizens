import Product from '../models/product.model'
import { Bootstrapper } from './Bootstraper'

export default class ProductBootstrap extends Bootstrapper {
  async run() {
    Product.bulkCreate([
      {
        productId: 'prod-1234-efgh-0000',
        name: 'Solar Panel XYZ',
        description: 'Solar Panel XYZ description',
        imageUrl: 'https://picsum.photos/100',
        altText: 'Solar Panel XYZ alt text',
      },
      {
        productId: 'prod-1235-efgh-0000',
        name: 'Solar Heater IJK',
        description: 'Solar Heater IJK description',
        imageUrl: 'https://picsum.photos/200',
        altText: 'Solar Heater IJK alt text',
      },
    ])
  }}
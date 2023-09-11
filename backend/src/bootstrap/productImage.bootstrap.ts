import { Bootstrapper } from './Bootstraper'
import ProductImage from '../models/productImage.model'

export default class ProductImageBootstrap extends Bootstrapper {
  async run() {
    ProductImage.bulkCreate([
      {
        productImageId: 'prod-1234-efgh-0000',
        productId: 'prod-1234-efgh-0000',
        imageUrl: 'https://picsum.photos/200',
        altText: 'Solar Panel XYZ',
      },
      {
        productImageId: 'prod-1235-efgh-0000',
        productId: 'prod-1235-efgh-0000',
        imageUrl: 'https://picsum.photos/100',
        altText: 'Solar Heater IJK',
      },
    ])
  }
}
import Product from '../models/products.model'
import { Bootstrapper } from './Bootstraper'

export default class ProductBootstrap extends Bootstrapper {
  async run() {
    await Product.bulkCreate([
      {
        productId: 'd1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        name: 'Product 1',
        description:
          'Los paneles solares están compuestos por células solares, generalmente hechas de silicio, que tienen la capacidad de generar electricidad cuando son expuestas a la luz',
        imageUrl: 'https://www.product1.com/image.png',
        imageAltText: 'Product 1 Image',
      },
      {
        productId: 'd2b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        name: 'Product 2',
        description: 'Product 2 description',
        imageUrl: 'https://www.product2.com/image.png',
        imageAltText: 'Product 2 Image',
      },
      {
        productId: 'd3b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        name: 'Product 3',
        description: 'Product 3 description',
        imageUrl: 'https://www.product3.com/image.png',
        imageAltText: 'Product 3 Image',
      },
    ])
  }
}

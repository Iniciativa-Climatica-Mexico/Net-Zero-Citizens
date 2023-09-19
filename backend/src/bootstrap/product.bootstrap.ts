import Product from '../models/products.model'
import { Bootstrapper } from './Bootstraper'

export default class ProductBootstrap extends Bootstrapper {
  async run() {
    await Product.bulkCreate([
      {
        productId: 'd1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        name: 'Product 1',
        description: 'Product 1 description',
        imageUrl: 'https://pansogal.com/wp-content/uploads/2019/07/funciona-panel-solar-con-nubes.jpg',
        imageAltText: 'Product 1 Image',
      },
      {
        productId: 'd2b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        name: 'Product 2',
        description: 'Product 2 description',
        imageUrl: 'https://images.adsttc.com/media/images/5ed5/4a01/b357/6538/ab00/048b/newsletter/aec-daily-solar-lighting_(2).jpg?1591036359',
        imageAltText: 'Product 2 Image',
      },
      {
        productId: 'd3b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        name: 'Product 3',
        description: 'Product 3 description',
        imageUrl: 'https://www.iberdrola.com/documents/20125/40918/Renovables_746x419.jpeg/171c88c6-834d-5309-0e0e-f758530dc3a9?t=1627967517593',
        imageAltText: 'Product 3 Image',
      },
    ])
  }
}

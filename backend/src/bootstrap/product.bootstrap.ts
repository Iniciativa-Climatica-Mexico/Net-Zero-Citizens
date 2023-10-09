import Product from '../models/products.model'
import { Bootstrapper } from './Bootstraper'

export default class ProductBootstrap extends Bootstrapper {
  async run() {
    await Product.bulkCreate([
      {
        productId: 'd1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        name: 'Paneles Solares',
        description:
          'Los paneles solares están compuestos por células solares, generalmente hechas de silicio',
        imageUrl: 'https://concepto.de/wp-content/uploads/2019/03/panel-solar-e1553091635674.jpg',
        imageAltText: 'Product 1 Image',
      },
      {
        productId: 'd2b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        name: 'Calentadores Solares',
        description: 'Product 2 description',
        imageUrl:
          'https://images.adsttc.com/media/images/5ed5/4a01/b357/6538/ab00/048b/newsletter/aec-daily-solar-lighting_(2).jpg?1591036359',
        imageAltText: 'Product 2 Image',
      },
    ])
  }
}

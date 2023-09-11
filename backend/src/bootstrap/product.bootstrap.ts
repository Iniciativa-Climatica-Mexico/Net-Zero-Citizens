import Product from '../models/product.model'
import { Bootstrapper } from './Bootstraper'

export default class ProductBootstrap extends Bootstrapper {
  async run() {
    Product.bulkCreate([
      {
        productId: 'prod-1234-efgh-0000',
        name: 'Sistemas Fotovoltaicos',	
        description: 'Descripcion de Sistemas Fotovoltaicos ABC',
        imageUrl: 'https://picsum.photos/100',
        altText: 'Panel Solar XYZ alt text',
      },
      {
        productId: 'prod-1235-efgh-0000',
        name: 'Calentador Solar',
        description: 'Descripcion de Calentador Solar ABC',
        imageUrl: 'https://picsum.photos/200',
        altText: 'Calentador Solar XYZ alt text',
      },
    ])
  }}
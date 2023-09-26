import chai from 'chai'
import chaiExclude from 'chai-exclude'
import { db, initDB } from '../src/configs/database.config'
import { unwrap } from './utils'
import { getAllProducts } from '../src/services/product.service'

chai.use(chaiExclude)

const { expect } = chai

const testData = [
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
  {
    productId: 'd3b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
    name: 'Product 3',
    description: 'Product 3 description',
    imageUrl:
      'https://www.iberdrola.com/documents/20125/40918/Renovables_746x419.jpeg/171c88c6-834d-5309-0e0e-f758530dc3a9?t=1627967517593',
    imageAltText: 'Product 3 Image',
  },
]

const attributesToExclude = ['productId', 'createdAt', 'updatedAt']

beforeEach(async () => {
  await db.drop()
  await initDB()
})

describe('Product Service', () => {
  it('should return all products', async () => {
    const response = await getAllProducts({ start: 0, pageSize: 10 })
    expect(unwrap(response).rows)
      .excluding(attributesToExclude)
      .to.deep.equal(testData)
  })
})

import chai from 'chai'
import chaiExclude from 'chai-exclude'
import { db, initDB } from '../src/configs/database.config'
import { unwrap } from './utils'
import { getAllProducts } from '../src/services/product.service'

chai.use(chaiExclude)

const { expect } = chai

const testData = [
  {
    name: 'Product 1',
    description: 'Product 1 description',
    imageUrl: 'https://www.product1.com/image.png',
    imageAltText: 'Product 1 Image',
  },
  {
    name: 'Product 2',
    description: 'Product 2 description',
    imageUrl: 'https://www.product2.com/image.png',
    imageAltText: 'Product 2 Image',
  },
  {
    name: 'Product 3',
    description: 'Product 3 description',
    imageUrl: 'https://www.product3.com/image.png',
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

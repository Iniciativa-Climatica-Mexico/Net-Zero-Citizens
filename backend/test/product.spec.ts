import chai from 'chai'
import chaiExclude from 'chai-exclude'
import { db, initDB } from '../src/configs/database.config'
import { unwrap } from './utils'
import { getAllProducts } from '../src/services/product.service'

chai.use(chaiExclude)

const { expect } = chai

const testData = [
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
]

const attributesToExclude = [
  'createdAt',
  'updatedAt',
]

beforeEach(async () => {
  await initDB()
})

afterEach(async () => {
  await db.drop()
})

describe('Product Service', () => {
  it('should return all products', async () => {
    const response = await getAllProducts({ start: 0, pageSize: 10 })
    expect(unwrap(response).rows)
      .excluding(attributesToExclude)
      .to.deep.equal(testData)
  })
})
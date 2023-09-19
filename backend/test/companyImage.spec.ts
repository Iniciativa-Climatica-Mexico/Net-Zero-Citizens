import chai from 'chai'
import chaiExclude from 'chai-exclude'
import { db, initDB } from '../src/configs/database.config'
import { unwrap } from './utils'
import * as CompanyImageService from '../src/services/companyImage.service'
chai.use(chaiExclude)

const { expect } = chai

const data: CompanyImageService.CompanyImageType = {
  companyId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
  imageUrl: 'https://image.url/454656',
  altText: 'Image Alt Text'
}   

const attributesToExclude = [
  'companyImageId',
  'createdAt',
  'updatedAt',
]

beforeEach(async () => {
  await initDB()
})

afterEach(async () => {
  await db.drop()
})

describe('Company Image Service', () => {
  it('should create a new company image', async () => {
    const companyImage = await CompanyImageService.uploadCompanyImage(data)
    expect(unwrap(companyImage)).excluding(attributesToExclude).to.deep.equal(data)
  }) 
})
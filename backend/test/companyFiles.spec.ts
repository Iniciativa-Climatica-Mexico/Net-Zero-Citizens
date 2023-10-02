import chai from 'chai'
import chaiExclude from 'chai-exclude'
import { db, initDB } from '../src/configs/database.config'
import { unwrap } from './utils'
import * as CompanyFileService from '../src/services/companyFiles.service'

chai.use(chaiExclude)

const { expect } = chai

const data: CompanyFileService.CompanyImageType = {
  companyId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
  fileUrl: 'https://image.url/454656',
  fileDescription: 'Imagen',
}

const attributesToExclude = ['companyFileId', 'createdAt', 'updatedAt']

beforeEach(async () => {
  await db.drop()
  await initDB()
})

describe('Company File Service', () => {
  it('should create a new company image', async () => {
    const companyImage = await CompanyFileService.uploadCompanyImage(data)
    expect(unwrap(companyImage))
      .excluding(attributesToExclude)
      .to.deep.equal(data)
  })
})

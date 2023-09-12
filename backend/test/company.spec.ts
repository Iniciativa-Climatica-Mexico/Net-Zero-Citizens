import chai from 'chai'
import chaiExclude from 'chai-exclude'
import { db, initDB } from '../src/configs/database.config'
import { getAllCompanies } from '../src/services/company.service'
import CompanyBootstrap from '../src/bootstrap/company.bootstrap'

chai.use(chaiExclude)

const { expect } = chai

const attributesToExclude = [
  'createdAt',
  'updatedAt',
  'deletedAt',
  'userId',
  'companyId',
]

beforeEach(async () => {
  await initDB()
})

afterEach(async () => {
  await db.drop()
})

describe('Company Service', () => {
  it('should return all companies', async () => {
    const response = await getAllCompanies({ start: 0, pageSize: 10 })

    expect(response)
      .excluding(attributesToExclude)
      .to.deep.equal(CompanyBootstrap.testData)
  })
})

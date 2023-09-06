import chai from 'chai'
import chaiExclude from 'chai-exclude'
import { db, initDB } from '../src/configs/database.config'
import {
  getAllCompanies,
  getCompanyById,
} from '../src/services/company.service'

chai.use(chaiExclude)

const { expect } = chai
const testData = [
  {
    userId: 1,
    name: 'Company 1',
    description: 'Company 1 description',
    email: 'example1@mail.com',
    location: 'Company 1 location',
    status: 'approved',
    phoneNumber: '123456789',
  },
  {
    userId: 2,
    name: 'Company 2',
    description: 'Company 2 description',
    email: 'example2@mail.com',
    location: 'Company 2 location',
    status: 'approved',
    phoneNumber: '1244598349',
  },
  {
    userId: 3,
    name: 'Company 3',
    description: 'Company 3 description',
    email: 'example3@mail.com',
    location: 'Company 3 location',
    status: 'pending_approval',
    phoneNumber: '8345858931',
  },
  {
    userId: 4,
    name: 'Company 4',
    description: 'Company 4 description',
    email: 'example4@mail.com',
    location: 'Company 4 location',
    status: 'rejected',
    phoneNumber: '548593485',
  },
]
const attributesToExclude = [
  'companyId',
  'createdAt',
  'updatedAt',
  'profilePicture',
  'webPage',
]

beforeEach(async () => {
  await initDB()
})

afterEach(async () => {
  await db.drop()
})

describe('Company Service', () => {
  it('should return a list of all companies', async () => {
    const response = await getAllCompanies({ start: 0, pageSize: 10 })

    response.rows.forEach((row, i) => {
      expect(row.dataValues)
        .excluding(attributesToExclude)
        .to.deep.equal(testData[i])
    })
  })

  it('should return a company by its id', async () => {
    const response = await getCompanyById('1')

    expect(response?.dataValues)
      .excluding(attributesToExclude)
      .to.deep.equal({
        ...testData[0],
      })
  })
})

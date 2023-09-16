import chai from 'chai'
import chaiExclude from 'chai-exclude'
import { db, initDB } from '../src/configs/database.config'
import { getAllCompanies } from '../src/services/company.service'
import { unwrap } from './utils'

chai.use(chaiExclude)

const { expect } = chai
const testData = [
  {
    userId: 'abcd-1234-efgh-5678',
    name: 'Company 1',
    description: 'Company 1 description',
    email: 'example1@mail.com',
    location: 'Company 1 location',
    status: 'approved',
    phoneNumber: '123456789',
  },
  {
    userId: 'abcd-1234-efgh-5678',
    name: 'Company 2',
    description: 'Company 2 description',
    email: 'example2@mail.com',
    location: 'Company 2 location',
    status: 'approved',
    phoneNumber: '1244598349',
  },
  {
    userId: null,
    name: 'Company 3',
    description: 'Company 3 description',
    email: 'example3@mail.com',
    location: 'Company 3 location',
    status: 'pending_approval',
    phoneNumber: '8345858931',
  },
  {
    userId: null,
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
  await db.drop()
  await initDB()
})

describe('Company Service', () => {
  it('should return a list of all companies', async () => {
    const response = await getAllCompanies({ start: 0, pageSize: 10 })
    expect(unwrap(response).rows)
      .excluding(attributesToExclude)
      .to.deep.equal(testData)
  })
})

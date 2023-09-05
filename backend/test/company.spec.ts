import { expect } from 'chai'
import { db, initDB } from '../src/configs/database.config'
import { getAllCompanies } from '../src/services/company.service'
import { CompanyModel } from '../src/models/company.model'

beforeEach(async () => {
  await initDB()
})

afterEach(async () => {
  await db.drop()
})

describe('Company Service', () => {
  it('should return a list of all companies', async () => {
    const response = await getAllCompanies({ start: 0, pageSize: 10 })

    // expect(response.rows.map((row) => row.dataValues)).to.include.members()
  })
})

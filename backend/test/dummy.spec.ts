import { db, initDB } from '../src/configs/database.config'
import { getGreeting } from '../src/services/dummy.service'
import { expect } from 'chai'

beforeEach(async () => {
  await db.drop()
  await initDB()
})

describe('Dummy Service', () => {
  it('should return a greeting', async () => {
    const response = await getGreeting('Andres')

    expect(response).to.equal('Hello Andres Garcia!')
  })
})

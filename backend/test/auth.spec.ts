import chai from 'chai'
import chaiExclude from 'chai-exclude'
import { db, initDB } from '../src/configs/database.config'
import { generateAuthToken, generateRefreshToken, verifyToken, Payload } from '../src/utils/AuthUtil'
import dotenv from 'dotenv'
dotenv.config()

chai.use(chaiExclude)

const { expect } = chai

const testData: Payload = {
  first_name: 'John',
  last_name: 'Doe',
  uuid: '123456789',
  email: 'john@doe',
  roles: ['admin', 'user'],
  login_type: 'google',
} 

const attributesToExclude = [
  'iat',
  'exp',
]

beforeEach(async () => {
  await initDB()
})

afterEach(async () => {
  await db.drop()
})

describe('AuthUtil', () => {
  it('should generate an auth token', () => {
    const token = generateAuthToken(testData)
    expect(token).to.be.a('string')
  })

  it('should generate a refresh token', () => {
    const token = generateRefreshToken(testData)
    expect(token).to.be.a('string')
  })

  it('should verify an auth token', () => {
    const token = generateAuthToken(testData)
    const payload = verifyToken(token, 'auth')
    expect(payload).excluding(attributesToExclude).to.deep.equal(testData)
  })

  it('should verify a refresh token', () => {
    const token = generateRefreshToken(testData)
    const payload = verifyToken(token, 'refresh')
    expect(payload).excluding(attributesToExclude).to.deep.equal(testData)
  })
})
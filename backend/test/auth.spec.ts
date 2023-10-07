import chai from 'chai'
import chaiExclude from 'chai-exclude'
import { db, initDB } from '../src/configs/database.config'
import * as AuthService from '../src/services/auth.service'
import dotenv from 'dotenv'
dotenv.config()

chai.use(chaiExclude)

const { expect } = chai

const testData: AuthService.Payload = {
  id: '1234567890',
  first_name: 'John',
  last_name: 'Doe',
  uuid: '123456789',
  email: 'john@doe',
  roles: 'admin',
  login_type: 'google',
}

const attributesToExclude = ['created_at', 'iat', 'exp']

beforeEach(async () => {
  await db.drop()
  await initDB()
})

describe('AuthService', () => {
  it('should generate a pair of auth & refresh tokens', async () => {
    const token = await AuthService.createTokens(testData)
    expect(token?.authToken).to.be.a('string')
    expect(token?.refreshToken).to.be.a('string')
  })

  it('should update tokens using refreshToken', async () => {
    const token = await AuthService.createTokens(testData)
    if (!token?.refreshToken) throw new Error('Fail creating refreshToken')

    const updateTokens = await AuthService.updateTokens(token?.refreshToken)
    expect(updateTokens?.tokens?.authToken).to.be.a('string')
    expect(updateTokens?.tokens?.refreshToken).to.be.a('string')
  })

  it('should verify an auth & refresh token', async () => {
    const token = await AuthService.createTokens(testData)
    if (!token?.authToken || !token?.refreshToken)
      throw new Error('Fail creating tokens')
    const payloadAuth = AuthService.verifyToken(token.authToken, 'auth')
    const payloadRefresh = AuthService.verifyToken(
      token.refreshToken,
      'refresh'
    )

    expect(payloadAuth).excluding(attributesToExclude).to.deep.equal(testData)
    expect(payloadRefresh)
      .excluding(attributesToExclude)
      .to.deep.equal(testData)
  })

  it('should blacklist a refresh token', async () => {
    const token = await AuthService.createTokens(testData)
    if (!token?.refreshToken) throw new Error('Fail creating refreshToken')

    // A new pair of tokens must be created
    const updateTokens = await AuthService.updateTokens(token.refreshToken)
    if (!updateTokens?.tokens?.refreshToken)
      throw new Error('Fail creating refreshToken')
    expect(updateTokens.tokens?.refreshToken).to.be.not.null

    // A new pair of tokens should not be created as a the same refreshToken is used twice
    const savedToken = await AuthService.updateTokens(token.refreshToken)
    expect(savedToken).to.be.null
  })

  it('should register and login a user', async () => {
    const testUser: AuthService.RegisterUser = {
      email: 'test@email.com',
      password: 'test',
      firstName: 'John',
      lastName: 'Smith',
      age: 20,
      state: 'Queretaro',
      phoneNumber: '4421234567',
      gender: 'other',
    }
    const authRes = await AuthService.register(testUser)
    expect(authRes?.user).to.containSubset({
      first_name: testUser.firstName,
      last_name: testUser.lastName,
      email: testUser.email,
      roles: 'new_user',
    })
    expect(authRes?.tokens).to.be.not.null
    expect(authRes?.error).to.be.undefined

    const loginRes = await AuthService.login(testUser.email, testUser.password)

    expect(loginRes?.user).to.containSubset({
      first_name: testUser.firstName,
      last_name: testUser.lastName,
      email: testUser.email,
      roles: 'new_user',
    })
    expect(loginRes?.tokens).to.be.not.null
    expect(loginRes?.error).to.be.undefined
  })
})

import chai from 'chai'
import chaiExclude from 'chai-exclude'
import { db, initDB } from '../src/configs/database.config'
import * as UserService from '../src/services/users.service'

chai.use(chaiExclude)

const { expect } = chai

const user = {
  userId: 'abcd-1234-efgh-5678',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phoneNumber: '1234567890',
  age: 30,
  state: 'NY',
  sex: 'masculine',
  roleId: 'ADMIN_ROLE_ID',
}


beforeEach(async () => {
  await initDB()
})

afterEach(async () => {
  await db.drop()
})

describe('UserService', () => {
  it('should return null while getting a false user', async () => {
    const res = await UserService.getUserByEmailWithRole('falseuseremail@mail.com')
    expect(res).to.be.null
  }) 
  it('should get a user by email with role', async () => {
    const res = await UserService.getUserByEmailWithRole(user.email)
    expect(res?.userId).to.equal('abcd-1234-efgh-5678')
    expect(res?.roleId).to.equal('ADMIN_ROLE_ID')
    expect(res?.role.dataValues.ROLE_ID).to.equal('ADMIN_ROLE_ID')
    expect(res?.role.dataValues.NAME).to.equal('admin')
  }) 
})
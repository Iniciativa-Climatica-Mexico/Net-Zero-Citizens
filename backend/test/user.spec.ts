import chai from 'chai'
import chaiExclude from 'chai-exclude'
import { db, initDB } from '../src/configs/database.config'
import * as UserService from '../src/services/users.service'
import { getAllUsers, createUser } from '../src/services/users.service'
import { unwrap } from './utils'
chai.use(chaiExclude)

const { expect } = chai

const testData = [
  {
    userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b8',
    roleId: 'ADMIN_ROLE_ID',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phoneNumber: '1234567890',
    age: 30,
    state: 'NY',
    gender: 'masculine',
    companyId: null,
    googleId: null,
    facebookId: null,
    appleId: null,
    secondLastName: null,
    password: null,
    profilePicture: null,
  },
  {
    userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b9',
    roleId: 'CUSTOMER_ROLE_ID',
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
    phoneNumber: '0987654321',
    age: 25,
    state: 'CA',
    gender: 'femenine',
    companyId: null,
    googleId: null,
    facebookId: null,
    appleId: null,
    secondLastName: null,
    password: null,
    profilePicture: null,
  },
  {
    userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b7',
    roleId: 'ADMIN_ROLE_ID',
    firstName: 'Sergio',
    lastName: 'Garnica González',
    email: 'a01704025@tec.mx',
    phoneNumber: '4424396065',
    age: 22,
    state: 'QRO',
    gender: 'masculine',
    companyId: null,
    googleId: null,
    facebookId: null,
    appleId: null,
    secondLastName: null,
    password: null,
    profilePicture: null,
  },
]
const newUser = {
  userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b6',
  roleId: 'CUSTOMER_ROLE_ID',
  companyId: null,
  googleId: null,
  facebookId: null,
  appleId: null,
  firstName: 'Test',
  lastName: 'Doe',
  secondLastName: null,
  email: 'test.doe@example.com',
  password: null,
  phoneNumber: '0147258369',
  age: 21,
  state: 'CA',
  gender: 'femenine',
  profilePicture: null,
}

const attributesToExclude = ['createdAt', 'updatedAt']

beforeEach(async () => {
  await db.drop()
  await initDB()
})

describe('UserService', () => {
  it('should return a list of all users', async () => {
    const response = await getAllUsers({ start: 0, pageSize: 10 })
    expect(unwrap(response).rows)
      .excluding(attributesToExclude)
      .to.deep.equal(testData)
  })

  it('should create a new user', async () => {
    const res = await createUser(newUser)
    expect(unwrap(res)).excluding(attributesToExclude).to.deep.equal(newUser)
  })

  it('should return null while getting a false user', async () => {
    const res = await UserService.getUserByEmailWithRole(
      'falseuseremail@mail.com'
    )
    expect(res).to.be.null
  })
  it('should get a user by email with role', async () => {
    const res = await UserService.getUserByEmailWithRole('john.doe@example.com')
    expect(res?.userId).to.equal('8de45630-2e76-4d97-98c2-9ec0d1f3a5b8')
    expect(res?.roleId).to.equal('ADMIN_ROLE_ID')
    expect(res?.role.dataValues.ROLE_ID).to.equal('ADMIN_ROLE_ID')
    expect(res?.role.dataValues.NAME).to.equal('admin')
  })
})

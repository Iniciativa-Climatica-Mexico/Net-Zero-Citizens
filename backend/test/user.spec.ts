import chai from 'chai'
import chaiExclude from 'chai-exclude'
import { db, initDB } from '../src/configs/database.config'
import * as UserService from '../src/services/users.service'
import { getAllUsers, createUser} from '../src/services/users.service'
import { unwrap } from './utils' 
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
  gender: 'masculine',
  roleId: 'ADMIN_ROLE_ID',
}

const testData = [
  {
    userId: 'abcd-1234-efgh-5678',
    roleId: 'ADMIN_ROLE_ID',
    companyId: null,
    googleId: null,
    facebookId: null,
    appleId: null,
    firstName: 'John',
    lastName: 'Doe',
    secondLastName: null,
    password: null,
    email: 'john.doe@example.com',
    phoneNumber: '1234567890',
    age: 30,
    state: 'NY',
    gender: 'masculine',
    profilePicture: null,
  },
  {
    userId: 'abcd-1234-efgh-5679',
    roleId: 'CUSTOMER_ROLE_ID',
    companyId: null,
    googleId: null,
    facebookId: null,
    appleId: null,
    firstName: 'Jane',
    lastName: 'Doe',
    secondLastName: null,
    email: 'jane.doe@example.com',
    password: null,
    phoneNumber: '0987654321',
    age: 25,
    state: 'CA',
    gender: 'femenine',
    profilePicture: null,
  },
  {
    userId: 'abcd-1234-efgh-1902',
    roleId: 'ADMIN_ROLE_ID',
    companyId: null,
    googleId: null,
    facebookId: null,
    appleId: null,
    firstName: 'Sergio',
    lastName: 'Garnica González',
    secondLastName: null,
    email: 'a01704025@tec.mx',
    password: null,
    phoneNumber: '4424396065',
    age: 22,
    state: 'QRO',
    gender: 'masculine',
    profilePicture: null,
  },

]
const newUser = {
  userId: 'abcd-1234-efgh-5680',
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

const attributesToExclude = [
  'createdAt',
  'updatedAt',
]

beforeEach(async () => {
  await initDB()
})

afterEach(async () => {
  await db.drop()
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
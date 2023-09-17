import User from '../models/users.model'
import { Bootstrapper } from './Bootstraper'

export default class UserBootstrap extends Bootstrapper {
  async run() {
    await User.bulkCreate([
      {
        userId: 'abcd-1234-efgh-5678',
        roleId: 'ADMIN_ROLE_ID',
        companyId: null,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '1234567890',
        age: 30,
        state: 'NY',
        gender: 'masculine',
      },
      {
        userId: 'abcd-1234-efgh-5679',
        roleId: 'CUSTOMER_ROLE_ID',
        companyId: null,
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        phoneNumber: '0987654321',
        age: 25,
        state: 'CA',
        gender: 'femenine',
      },
      {
        userId: 'abcd-1234-efgh-1902',
        roleId: 'ADMIN_ROLE_ID',
        companyId: null,
        firstName: 'Sergio',
        lastName: 'Garnica González',
        email: 'a01704025@tec.mx',
        phoneNumber: '4424396065',
        age: 22,
        state: 'QRO',
        gender: 'masculine',
      },
    ])
  }
}
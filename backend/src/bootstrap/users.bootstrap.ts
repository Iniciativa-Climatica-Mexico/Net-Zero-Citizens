import User from '../models/users.model'
import { Bootstrapper } from './Bootstraper'

export default class UserBootstrap extends Bootstrapper {
  async run() {
    await User.bulkCreate([
      {
        userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b8',
        roleId: 'ADMIN_ROLE_ID',
        companyId: null,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '8453728592',
        age: 30,
        state: 'NY',
        gender: 'masculine',
      },
      {
        userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b9',
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
        userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b7',
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
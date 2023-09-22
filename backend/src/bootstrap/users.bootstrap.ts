import { Bootstrapper } from './Bootstraper'
import User from '../models/users.model'

export default class UserBootstrap extends Bootstrapper {
  async run() {
    User.bulkCreate([
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
        deviceToken: '',
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
    ])
  }
}

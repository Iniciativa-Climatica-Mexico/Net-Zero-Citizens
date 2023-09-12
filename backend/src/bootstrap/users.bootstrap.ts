import { Bootstrapper } from './Bootstraper'
import User from '../models/users.model'

export default class UserBootstrap extends Bootstrapper {
  async run() {    
    User.bulkCreate([
      {
        userId: 'abcd-1234-efgh-5678',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '1234567890',
        age: 30,
        state: 'NY',
        sex: 'masculine',
        roleId: 'ADMIN_ROLE_ID',
      },
      {
        userId: 'abcd-1234-efgh-5679',
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        phoneNumber: '0987654321',
        age: 25,
        state: 'CA',
        sex: 'femenine',
        roleId: 'CUSTOMER_ROLE_ID',
      },
    ])
  }
}

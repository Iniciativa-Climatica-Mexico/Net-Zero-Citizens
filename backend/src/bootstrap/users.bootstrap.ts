import User from '../models/users.model'
import { Bootstrapper } from './Bootstraper'

export default class UserBootstrap extends Bootstrapper {
  async run() {
    await User.bulkCreate([
      {
        userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b8',
        roleId: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '1234567890',
        age: 30,
        state: 'NY',
        sex: 'masculine',
      },
      {
        userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b9',
        roleId: 2,
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        phoneNumber: '0987654321',
        age: 25,
        state: 'CA',
        sex: 'femenine',
      },
    ])
  }
}

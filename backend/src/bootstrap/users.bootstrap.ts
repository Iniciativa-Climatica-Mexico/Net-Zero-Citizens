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
        deviceToken:
        '80c3fd1ebc0c84684842ddf63f4f512bb59d47099ed5d435051f4eacc056e332db703ef369b7cd5a6bbf6917bc72572655fbd1c586ebfad1586ef0fd1e72b8a3676951df76db41c696e250120bc1c208',
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
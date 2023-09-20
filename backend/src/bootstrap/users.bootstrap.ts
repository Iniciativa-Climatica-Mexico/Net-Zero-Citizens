import { Bootstrapper } from './Bootstraper'
import User from '../models/users.model'

export default class UserBootstrap extends Bootstrapper {
  async run() {    
    User.bulkCreate([
      {
        userId: '90caa3f9-26ca-4579-86fd-42005cf0f8b2',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '1234567890',
        age: 30,
        state: 'Aguascalientes',
        sex: 'Femenino',
        roleId: 'ADMIN_ROLE_ID',
        deviceToken:
          '80c3fd1ebc0c84684842ddf63f4f512bb59d47099ed5d435051f4eacc056e332db703ef369b7cd5a6bbf6917bc72572655fbd1c586ebfad1586ef0fd1e72b8a3676951df76db41c696e250120bc1c208',
      },
      {
        userId: '0cca9c89-c38e-4350-ae31-9215741c8f11',
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        phoneNumber: '0987654321',
        age: 25,
        state: 'Baja California',
        sex: 'Masculino',
        roleId: 'CUSTOMER_ROLE_ID',
      },
    ])
  }
}
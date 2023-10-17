import User from '../../models/users.model'
import { Bootstrapper } from '../Bootstraper'

export default class UserBootstrap extends Bootstrapper {
  async run() {
    await User.bulkCreate([
      {
        userId: 'b5beb2ca-10da-4b78-a058-d417a7dc96a6',
        roleId: 'ADMIN_ROLE_ID',
        firstName: 'Administrador',
        lastName: '1',
        email: 'Admin1@greencircleadmin.com',
        password:
          '$2b$10$GChSjDJx8xzYxdFGI.1guegXmO28VkCXKF7S/LRwHbpa2hzWlmPOW',
        salt: '$2b$10$GChSjDJx8xzYxdFGI.1gue',
        age: 21,
        state: 'Queretaro',
        gender: 'other',
      },
      {
        userId: '6968d65a-1ae5-4c20-8b8c-1ae3798fded5',
        roleId: 'ADMIN_ROLE_ID',
        firstName: 'Administrador',
        lastName: '2',
        email: 'Admin2@greencircleadmin.com',
        password:
          '$2b$10$I0cx/g4dxqWQSquczdrSBOPaqK/o/nFsR6rudGZoaM2fHt9CsOZG.',
        salt: '$2b$10$I0cx/g4dxqWQSquczdrSBO',
        age: 21,
        state: 'Queretaro',
        gender: 'other',
      },
      {
        userId: 'ad90a6af-dde5-43fa-b9e0-2a48c45466e2',
        roleId: 'ADMIN_ROLE_ID',
        firstName: 'Administrador',
        lastName: '3',
        email: 'Admin3@greencircleadmin.com',
        password:
          '$2b$10$e9R5/gEt/m91F4JaMyQLj./35jm1SA19E8yk4swXETWn0xxc8W3fq',
        salt: '$2b$10$e9R5/gEt/m91F4JaMyQLj.',
        age: 21,
        state: 'Queretaro',
        gender: 'other',
      },
      {
        userId: '80258658-062a-466d-869e-266f336642fa',
        roleId: 'ADMIN_ROLE_ID',
        firstName: 'Administrador',
        lastName: '4',
        email: 'Admin4@greencircleadmin.com',
        password:
          '$2b$10$CYHNiDhDvE6tjdXI2cp8C.2IC9bPJUpemXA1fP6mnpCAyBNK2ZCbu',
        salt: '$2b$10$CYHNiDhDvE6tjdXI2cp8C.',
        age: 21,
        state: 'Queretaro',
        gender: 'other',
      },
      {
        userId: 'cbfb2951-9a62-4576-9c1e-cf15a590ac94',
        roleId: 'ADMIN_ROLE_ID',
        firstName: 'Administrador',
        lastName: '5',
        email: 'Admin5@greencircleadmin.com',
        password:
          '$2b$10$htHvc.B2nF2nlqHdfPkzjuXFwdhiCDqo9vcIHgxdZ9ImqYodiogma',
        salt: '$2b$10$htHvc.B2nF2nlqHdfPkzju',
        age: 21,
        state: 'Queretaro',
        gender: 'other',
      },
    ])
  }
}

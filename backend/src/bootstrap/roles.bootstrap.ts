import { Bootstrapper } from './Bootstraper'
import Role from '../models/role.model'

export default class RolesBootstrap extends Bootstrapper {
  async run() {
    Role.bulkCreate([
      {
        roleId: 'ADMIN_ROLE_ID',
        name: 'admin'
      },
      {
        roleId: 'CUSTOMER_ROLE_ID',
        name: 'customer'
      },
      {
        roleId: 'COMAPNY_ROLE_ID',
        name: 'company'
      },
      {
        roleId: 'ICM_ROLE_ID',
        name: 'icm'
      }
    ])
  }
}

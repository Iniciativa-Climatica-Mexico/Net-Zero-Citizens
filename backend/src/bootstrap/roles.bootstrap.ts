import { Bootstrapper } from './Bootstraper'
import Role from '../models/role.model'

export default class RolesBootstrapper extends Bootstrapper {
  async run() {
    Role.bulkCreate([
      {
        roleId: 'admin',
        name: 'admin'
      },
      {
        roleId: 'customer',
        name: 'customer'
      },
      {
        roleId: 'company',
        name: 'company'
      },
      {
        roleId: 'icm',
        name: 'icm'
      }
    ])
  }
}

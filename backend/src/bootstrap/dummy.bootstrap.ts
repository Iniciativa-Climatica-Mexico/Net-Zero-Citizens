import Dummy from '../models/dummy.model'
import { Bootstrapper } from './Bootstraper'

export default class DummyBootstrap extends Bootstrapper {
  async run() {
    await Dummy.bulkCreate([
      { name: 'Andres', lastName: 'Garcia' },
      { name: 'Juan', lastName: 'Perez' },
      { name: 'Pedro', lastName: 'Gonzalez' },
      { name: 'Maria', lastName: 'Hurtado' },
      { name: 'Luis', lastName: 'Garcia' },
      { name: 'Andrea', lastName: 'Garcia' },
      { name: 'Andres', lastName: 'Perez' },
      { name: 'Juan', lastName: 'Gonzalez' },
      { name: 'Pedro', lastName: 'Hurtado' },
      { name: 'Maria', lastName: 'Garcia' },
      { name: 'Luis', lastName: 'Perez' },
      { name: 'Andrea', lastName: 'Gonzalez' },
    ])
  }
}

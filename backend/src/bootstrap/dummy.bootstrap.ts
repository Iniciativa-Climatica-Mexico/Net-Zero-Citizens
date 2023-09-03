import { Dummy } from '../models/dummy.model'
import { Bootstrapper } from './Bootstraper'

export default class DummyBootstrap extends Bootstrapper {
  async run() {
    Dummy.bulkCreate([
      { name: 'John', lastName: 'Doe' },
      { name: 'Jane', lastName: 'Doe' },
      { name: 'John', lastName: 'Smith' },
      { name: 'Jane', lastName: 'Smith' },
    ])
  }
}

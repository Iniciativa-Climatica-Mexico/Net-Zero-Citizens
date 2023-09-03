import { DummyModel } from '../models/dummy.model'
import { Bootstrapper } from './Bootstraper'

export default class DummyBootstrap extends Bootstrapper {
  async run() {
    DummyModel.bulkCreate([
      { name: 'John', lastName: 'Doe' },
      { name: 'Jane', lastName: 'Doe' },
      { name: 'John', lastName: 'Smith' },
      { name: 'Jane', lastName: 'Smith' },
    ])
  }
}

import Favourite from '../models/favourite.model'
import { Bootstrapper } from './Bootstraper'

export default class FavouriteBootstrap extends Bootstrapper {
  async run() {
    Favourite.bulkCreate([
      {
        favouriteId: '550e8400-e29b-41d4-a716-446655440000',
        companyId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b8',
        savedAt: new Date(),
      },
      {
        favouriteId: '7a91f1c9-7a29-4a4e-80d8-57e8f0e709b6',
        companyId: 'a2b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b8',
        savedAt: new Date(),
      },
      {
        favouriteId: 'f5b7b3c8-2675-4b7b-bc8a-3af3cabb2f13',
        companyId: 'a2b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7f',
        userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b8',
        savedAt: new Date(),
      },
    ])
  }
}

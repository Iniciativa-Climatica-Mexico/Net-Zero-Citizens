import Ecoinfo from '../models/ecoinfo.model'
import { Bootstrapper } from './Bootstraper'

export default class EcoinfoBootstrap extends Bootstrapper {
  async run() {
    Ecoinfo.bulkCreate([
      {
        ecoInfoId: 'eco-1234-efgh-0000',
        postId: 'post-1234-efgh-0000',
        coverImage: 'cover-image-1.jgp',
        description: 'This is a portaluppi mesage',
      },
      {
        ecoInfoId: 'eco-1234-efgh-0001',
        postId: 'post-1234-efgh-0001',
        coverImage: 'cover-image-2.jgp',
        description: 'This is a portaluppi mesage 2',
      },
      {
        ecoInfoId: 'eco-1234-efgh-0002',
        postId: 'post-1234-efgh-0002',
        coverImage: 'cover-image-3.jgp',
        description: 'This is a portaluppi mesage 3',
      },
    ])
  }
}

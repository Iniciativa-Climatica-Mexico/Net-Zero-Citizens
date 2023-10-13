import chai from 'chai'
import chaiExclude from 'chai-exclude'
import sinon from 'sinon'
import { unwrap } from './utils'
import { db, initDB } from '../src/configs/database.config'

chai.use(chaiExclude)
const { expect } = chai

const testData = [
  {
    ecoinfoId: '550e8400-e29b-41d4-a716-446655440000',
    postId: 'post-1234-efgh-0000',
    postLink: 'https://www.facebook.com/iniciativaclima',
    coverImage:
      'https://scontent-atl3-2.xx.fbcdn.net/v/t39.30808-6/376771300_611797287819531_4257456994451162629_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=49d041&_nc_ohc=HJ_qzSnEZuUAX-PO-o8&_nc_ht=scontent-atl3-2.xx&oh=00_AfCnbl7_6L8-D26mkoiTzLEG9A8TcJ_dB7oQjg5ut_yHGQ&oe=65102A8E',
    description:
      '59% de los municipios de México sean sumamente vulnerables al cambio climático. Ruta Emisiones Netas Cero una propuesta que busca guiar las acciones de México y alcanzar el “cero neto” en 2050.',
    createdPostAt: new Date('2021-08-01T00:00:00.000Z'),
  },
  {
    ecoinfoId: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    postId: 'post-1234-efgh-0001',
    postLink: 'https://www.facebook.com/iniciativaclima',
    coverImage:
      'https://scontent-atl3-1.xx.fbcdn.net/v/t39.30808-6/375211516_608590191473574_5948856669388154492_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=49d041&_nc_ohc=hmW0YFv-kSEAX9rQQcs&_nc_ht=scontent-atl3-1.xx&oh=00_AfCrUtGCPtw5aWdc6M16e_Vtm671qgTLe1xC0tB3RhtBHw&oe=6510C0CD',
    description:
      '!!AUMENTA pobreza energética en la República mexicana; 45 mil localidades carecen de energía. ☀️',
    createdPostAt: new Date('2021-08-01T00:00:00.000Z'),
  },
  {
    ecoinfoId: 'a1b2c3d4-e5f6-7890-a1b2-3456789cdef0',
    postId: 'post-1234-efgh-0002',
    postLink: 'https://www.facebook.com/iniciativaclima',
    coverImage:
      'https://scontent-atl3-1.xx.fbcdn.net/v/t39.30808-6/374179586_607113321621261_708920956145199536_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=49d041&_nc_ohc=zJ9A411wiIQAX_4hlyX&_nc_ht=scontent-atl3-1.xx&oh=00_AfCcHFjYHu7V0tEEvvfepXh6g_sun5tvVVwyWyNrru3H1A&oe=65114196',
    description:
      'La arquitectura regenerativa representa la posibilidad de repensar los espacios comunes y comprender que los territorios, son sistemas que incluyen lo geológico, orográfico, hidrológico, biológico y, también, lo comunitario y cultural. ',
    createdPostAt: new Date('2021-08-01T00:00:00.000Z'),
  },
  {
    ecoinfoId: '9e10f11a-12b3-45c6-d7e8-9f0123456789',
    postId: 'post-1234-efgh-0003',
    postLink: 'https://www.facebook.com/iniciativaclima',
    coverImage:
      'https://scontent-atl3-2.xx.fbcdn.net/v/t39.30808-6/371783251_605430471789546_4338049499711587015_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=49d041&_nc_ohc=xlOp-e2HPWwAX-HWkte&_nc_ht=scontent-atl3-2.xx&oh=00_AfC0J1uISyGHOG52gVns4KSAEolSOWQp05GeGmCIykxksw&oe=6510090A',
    description:
      'Es posible establecer procesos regenerativos incluso en las peores condiciones.',
    createdPostAt: new Date('2021-08-01T00:00:00.000Z'),
  },
]

const exclude = ['createdAt', 'updatedAt', 'createdPostAt']

beforeEach(() => {
  db.drop()
  initDB()
})

describe('EcoInfo Service', () => {
  let getAllEcoinfo: sinon.SinonStub

  beforeEach(() => {
    db.drop()
    initDB()

    getAllEcoinfo = sinon.stub(getAllEcoinfo).returns(Promise.resolve(testData))
  })

  afterEach(() => {
    sinon.restore()
  })

  it('should return all ecoinfo', async () => {
    const ecoinfo = await getAllEcoinfo()

    expect(unwrap(ecoinfo)).excludingEvery(exclude).to.deep.equal(testData)
  })
})

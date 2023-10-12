import chai from 'chai'
import chaiExclude from 'chai-exclude'
import { db, initDB } from '../src/configs/database.config'
import {
  assignCompanyUser,
  getAllCompanies,
  getCompanyById,
} from '../src/services/company.service'
import Company from '../src/models/company.model'
import User from '../src/models/users.model'
import { unwrap } from './utils'

chai.use(chaiExclude)

const { expect } = chai
const testData = [
  {
    companyId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
    userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b8',
    name: 'SUNPOWER',
    description: 'Más potencia en condiciones del mundo real',
    email: 'contact@sunpower.com',
    phone: '8453728592',
    webPage: 'https://www.sunpower.com',
    street: 'Las Lomas Verdes',
    streetNumber: '123',
    city: 'Ciudad de México',
    state: 'CDMX',
    zipCode: '72000',
    latitude: 19.5051687,
    longitude: -99.2565699,
    score: 4.3,
    status: 'pending_approval',
    profilePicture:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Sunpower_logo.svg/2560px-Sunpower_logo.svg.png',
    files: [
      {
        companyFileId: '7f9a3d21-6b49-4e7c-ae56-1b0e8fcd9621',
        companyId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        fileDescription: 'Imagen',
        fileFormat: null,
        fileUrl:
          'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1758&q=80',
      },
      {
        companyFileId: '7f9a3d21-6b49-4e7c-ae56-1b0e8fcd9622',
        companyId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        fileDescription: 'Imagen',
        fileFormat: null,
        fileUrl:
          'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1772&q=80',
      },
      {
        companyFileId: '7f9a3d21-6b49-4e7c-ae56-1b0e8fcd9623',
        companyId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        fileDescription: 'Imagen',
        fileFormat: null,
        fileUrl:
          'https://images.unsplash.com/photo-1595437193398-f24279553f4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80',
      },
    ],
  },
  {
    companyId: 'a2b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
    userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b9',
    name: 'Exel Solar',
    description: 'Company 2 description',
    email: 'company2@outlook.com',
    phone: '0123456799',
    webPage: 'https://www.company2.com',
    street: 'Pino Suárez',
    streetNumber: '383',
    city: 'Queretaro',
    state: 'QRO',
    zipCode: '76178',
    latitude: 20.5844021,
    longitude: -100.412604,
    status: 'pending_approval',
    profilePicture:
      'https://latam.apsystems.com/wp-content/uploads/2018/08/apsystems-exelsolar.png',
    files: [
      {
        companyFileId: '7f9a3d21-6b49-4e7c-ae56-1b0e8fcd9721',
        companyId: 'a2b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        fileDescription: 'Imagen',
        fileFormat: null,
        fileUrl:
          'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1758&q=80',
      },
      {
        companyFileId: '7f9a3d21-6b49-4e7c-ae56-1b0e8fcd9722',
        companyId: 'a2b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        fileDescription: 'Imagen',
        fileFormat: null,
        fileUrl:
          'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1772&q=80',
      },
      {
        companyFileId: '7f9a3d21-6b49-4e7c-ae56-1b0e8fcd9723',
        companyId: 'a2b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        fileDescription: 'Imagen',
        fileFormat: null,
        fileUrl:
          'https://images.unsplash.com/photo-1595437193398-f24279553f4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80',
      },
    ],
  },
  {
    companyId: 'a2c0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
    userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b7',
    name: 'TESLA ENERGY',
    description: 'Company 3 description',
    email: 'company3@outlook.com',
    phone: '0126756789',
    webPage: 'https://www.company3.com',
    street: 'Nezahualcóyotl, Estado de México, 57430',
    streetNumber: '123',
    city: 'Ciudad de México',
    state: 'CDMX',
    zipCode: '76178',
    latitude: 19.4126494,
    longitude: -99.0553812,
    status: 'approved',
    profilePicture:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Sunpower_logo.svg/2560px-Sunpower_logo.svg.png',
    files: [
      {
        companyFileId: '7f9a3d21-6b49-4e7c-ae56-1b0e8fcd9821',
        companyId: 'a2c0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        fileDescription: 'Imagen',
        fileFormat: null,
        fileUrl:
          'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1758&q=80',
      },
      {
        companyFileId: '7f9a3d21-6b49-4e7c-ae56-1b0e8fcd9822',
        companyId: 'a2c0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        fileDescription: 'Imagen',
        fileFormat: null,
        fileUrl:
          'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1772&q=80',
      },
      {
        companyFileId: '7f9a3d21-6b49-4e7c-ae56-1b0e8fcd9823',
        companyId: 'a2c0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        fileDescription: 'Imagen',
        fileFormat: null,
        fileUrl:
          'https://images.unsplash.com/photo-1595437193398-f24279553f4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80',
      },
    ],
  },
]

const mockCompany = {
  companyId: 'a2c0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
  userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b7',
  name: 'TESLA ENERGY',
  description: 'Company 3 description',
  email: 'company3@outlook.com',
  phone: '0126756789',
  webPage: 'https://www.company3.com',
  street: 'Nezahualcóyotl, Estado de México, 57430',
  streetNumber: '123',
  city: 'Ciudad de México',
  state: 'CDMX',
  zipCode: '76178',
  latitude: 19.4126494,
  longitude: -99.0553812,
  status: 'approved',
  profilePicture:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Sunpower_logo.svg/2560px-Sunpower_logo.svg.png',
  files: [
    {
      companyFileId: '7f9a3d21-6b49-4e7c-ae56-1b0e8fcd9821',
      companyId: 'a2c0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
      fileDescription: 'Imagen',
      fileFormat: null,
      fileUrl:
        'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1758&q=80',
    },
    {
      companyFileId: '7f9a3d21-6b49-4e7c-ae56-1b0e8fcd9822',
      companyId: 'a2c0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
      fileDescription: 'Imagen',
      fileFormat: null,
      fileUrl:
        'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1772&q=80',
    },
    {
      companyFileId: '7f9a3d21-6b49-4e7c-ae56-1b0e8fcd9823',
      companyId: 'a2c0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
      fileDescription: 'Imagen',
      fileFormat: null,
      fileUrl:
        'https://images.unsplash.com/photo-1595437193398-f24279553f4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80',
    },
  ],
}

const attributesToExclude = [
  'createdAt',
  'updatedAt',
  'deletedAt',
  'products',
  'files',
  'score',
]

beforeEach(async () => {
  await db.drop()
  await initDB()
})

describe('Company Service', () => {
  it('should get company by id', async () => {
    const response = await getCompanyById(
      'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e'
    )

    expect(response?.get())
      .excludingEvery(attributesToExclude.concat('oneComment'))
      .to.deep.equal(testData[0])
  })

  it('should return null if company does not exist', async () => {
    const response = await getCompanyById(
      'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7f'
    )
    expect(response).to.be.null
  })

  it('should filter companies by name', async () => {
    const companies = await getAllCompanies({ name: 'sunpo' })
    expect(unwrap(companies.rows))
      .excludingEvery(attributesToExclude)
      .to.deep.equal([testData[0]])
  })

  it('should filter companies by state', async () => {
    const companies = await getAllCompanies({ state: 'QRO' })
    expect(unwrap(companies.rows))
      .excludingEvery(attributesToExclude)
      .to.deep.equal([testData[1]])
  })

  it('should filter companies by product', async () => {
    const companies = await getAllCompanies({ productName: 'Paneles Solares' })
    console.log(companies.rows.map((c) => c.products))
    expect(unwrap(companies.rows))
      .excludingEvery(attributesToExclude)
      .to.deep.equal([testData[0]])
  })

  it('should order companies by score', async () => {
    const companies = await getAllCompanies({ ordering: 'score' })
    const scores = companies.rows.map((company) => company.score || 0)
    let previous = 1000
    const isOrdered = !scores.some(function (score) {
      const isOrdered = score > previous
      previous = score
      return isOrdered
    })
    expect(isOrdered).to.equal(true)
  })

  it('should order companies by distance', async () => {
    const companies = await getAllCompanies({
      ordering: 'distance',
      latitude: 20.626908,
      longitude: -100.402864,
    })
    const testDataIn = [testData[1], testData[0], testData[2]].map(
      (c) => c.companyId
    )
    expect(companies.rows.map((c) => c.companyId)).to.deep.equal(testDataIn)
  })
})

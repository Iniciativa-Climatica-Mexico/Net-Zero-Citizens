import chai from 'chai'
import chaiExclude from 'chai-exclude'
import { db, initDB } from '../src/configs/database.config'
import {
  assignCompanyUser,
  getCompaniesByStatus,
  getCompanyById,
} from '../src/services/company.service'
import Company from '../src/models/company.model'
import User from '../src/models/users.model'

chai.use(chaiExclude)

const { expect } = chai
const testData = [
  {
    companyId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
    userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b8',
    name: 'SUNPOWER',
    oneComment: 'This is a comment',
    description: 'Más potencia en condiciones del mundo real',
    email: 'contact@sunpower.com',
    files: [
      {
        companyFileId: '7f9a3d21-6b49-4e7c-ae56-1b0e8fcd9821',
        companyId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        fileDescription: 'Imagen',
        fileFormat: null,
        fileUrl:
          'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1758&q=80',
      },
      {
        companyFileId: '7f9a3d21-6b49-4e7c-ae56-1b0e8fcd9822',
        companyId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        fileDescription: 'Imagen',
        fileFormat: null,
        fileUrl:
          'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1772&q=80',
      },
      {
        companyFileId: '7f9a3d21-6b49-4e7c-ae56-1b0e8fcd9823',
        companyId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        fileDescription: 'Imagen',
        fileFormat: null,
        fileUrl:
          'https://images.unsplash.com/photo-1595437193398-f24279553f4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80',
      },
    ],
    phone: '8453728592',
    webPage: 'https://www.sunpower.com',
    street: 'Las Lomas Verdes',
    streetNumber: '123',
    city: 'Ciudad de México',
    state: 'CDMX',
    zipCode: '72000',
    score: 4.3,
    status: 'pending_approval',
  },
  {
    companyId: 'a2b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
    userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b9',
    name: 'Exel Solar',
    description: 'Company 2 description',
    email: 'company2@outlook.com',
    files: [
      {
        companyFileId: '7f9a3d21-6b49-4e7c-ae56-1b0e8fcd9821',
        companyId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        fileDescription: 'Imagen',
        fileFormat: null,
        fileUrl:
          'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1758&q=80',
      },
      {
        companyFileId: '7f9a3d21-6b49-4e7c-ae56-1b0e8fcd9822',
        companyId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        fileDescription: 'Imagen',
        fileFormat: null,
        fileUrl:
          'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1772&q=80',
      },
      {
        companyFileId: '7f9a3d21-6b49-4e7c-ae56-1b0e8fcd9823',
        companyId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        fileDescription: 'Imagen',
        fileFormat: null,
        fileUrl:
          'https://images.unsplash.com/photo-1595437193398-f24279553f4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80',
      },
    ],
    phone: '0123456799',
    webPage: 'https://www.company2.com',
    street: 'Company 2 street',
    streetNumber: '123',
    city: 'Queretaro',
    state: 'QRO',
    zipCode: '76152',
    status: 'rejected',
    score: 4.3,
  },
  {
    companyId: 'a2c0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
    userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b7',
    name: 'TESLA ENERGY',
    description: 'Company 3 description',
    email: 'company3@outlook.com',
    files: [
      {
        companyFileId: '7f9a3d21-6b49-4e7c-ae56-1b0e8fcd9821',
        companyId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        fileDescription: 'Imagen',
        fileFormat: null,
        fileUrl:
          'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1758&q=80',
      },
      {
        companyFileId: '7f9a3d21-6b49-4e7c-ae56-1b0e8fcd9822',
        companyId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        fileDescription: 'Imagen',
        fileFormat: null,
        fileUrl:
          'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1772&q=80',
      },
      {
        companyFileId: '7f9a3d21-6b49-4e7c-ae56-1b0e8fcd9823',
        companyId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        fileDescription: 'Imagen',
        fileFormat: null,
        fileUrl:
          'https://images.unsplash.com/photo-1595437193398-f24279553f4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80',
      },
    ],
    phone: '0126756789',
    webPage: 'https://www.company3.com',
    street: 'Company 3 street',
    streetNumber: '123',
    city: 'Ciudad de México',
    state: 'CDMX',
    zipCode: '76152',
    status: 'approved',
    score: 4.3,
  },
]

const mockCompany = {
  name: 'TESLA ENERGY',
  description: 'Company 3 description',
  email: 'company3@outlook.com',
  files: [
    {
      companyFileId: '7f9a3d21-6b49-4e7c-ae56-1b0e8fcd9821',
      companyId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
      fileDescription: 'Imagen',
      fileFormat: null,
      fileUrl:
        'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1758&q=80',
    },
    {
      companyFileId: '7f9a3d21-6b49-4e7c-ae56-1b0e8fcd9822',
      companyId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
      fileDescription: 'Imagen',
      fileFormat: null,
      fileUrl:
        'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1772&q=80',
    },
    {
      companyFileId: '7f9a3d21-6b49-4e7c-ae56-1b0e8fcd9823',
      companyId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
      fileDescription: 'Imagen',
      fileFormat: null,
      fileUrl:
        'https://images.unsplash.com/photo-1595437193398-f24279553f4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80',
    },
  ],
  phone: '0126756789',
  webPage: 'https://www.company3.com',
  street: 'Company 3 street',
  streetNumber: '123',
  city: 'Ciudad de México',
  state: 'CDMX',
  zipCode: '76152',
  status: 'pending_approval',
  score: 4.3,
}
const attributesToExclude = [
  'createdAt',
  'updatedAt',
  'deletedAt',
  'products',
  'images',
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
      .excludingEvery(attributesToExclude)
      .to.deep.equal(testData[0])
  })

  it('should return null if company does not exist', async () => {
    const response = await getCompanyById(
      'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7f'
    )
    expect(response).to.be.null
  })

  it('should assign a user to a company', async () => {
    console.log('mockCompany', mockCompany)
    const company = await Company.create(mockCompany)
    const user = await User.create({
      roleId: 'ADMIN_ROLE_ID',
      companyId: null,
      appleId: null,
      facebookId: null,
      googleId: null,
      password: null,
      profilePicture: null,
      secondLastName: null,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe2@example.com',
      phoneNumber: '8453728592',
      age: 30,
      state: 'NY',
      gender: 'masculine',
      deviceToken: '',
    })
    await assignCompanyUser(company.companyId, user.userId)
    const updatedCompany = await Company.findByPk(company.companyId)
    const updatedUser = await User.findByPk(user.userId)
    expect(updatedCompany?.userId).to.equal(user.userId)
    expect(updatedUser?.companyId).to.equal(company.companyId)
    expect(updatedUser?.roleId).to.equal('COMAPNY_ROLE_ID')
  })
})

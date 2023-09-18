import chai from 'chai'
import chaiExclude from 'chai-exclude'
import { db, initDB } from '../src/configs/database.config'
import {
  getAllCompanies,
  getCompanyById,
} from '../src/services/company.service'

chai.use(chaiExclude)

const { expect } = chai

const testData = [
  {
    companyId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
    userId: 'abcd-1234-efgh-5678',
    name: 'Company 1',
    description: 'Company 1 description',
    email: 'company@outlook.com',
    phone: '1234567890',
    webPage: 'https://www.company1.com',
    street: 'Company 1 street',
    streetNumber: 123,
    city: 'Puebla',
    state: 'Puebla',
    zipCode: 72000,
    latitude: 19.041296,
    longitude: -98.206199,
    profilePicture: 'https://www.company1.com/profilePicture.png',
    pdfCurriculumUrl: 'https://www.company1.com/pdfCurriculum.pdf',
    pdfDicCdmxUrl: 'https://www.company1.com/pdfDicCdmx.pdf',
    pdfPeeFideUrl: 'https://www.company1.com/pdfPeeFide.pdf',
    pdfGuaranteeSecurityUrl:
      'https://www.company1.com/pdfGuaranteeSecurity.pdf',
    pdfActaConstitutivaUrl: 'https://www.company1.com/pdfActaConstitutiva.pdf',
    pdfIneUrl: 'https://www.company1.com/pdfIne.pdf',
    status: 'approved',
    products: [{
      productId: 'd1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
      name: 'Product 1',
      description: 'Product 1 description',
      imageUrl: 'https://www.product1.com/image.png',
      imageAltText: 'Product 1 Image',
    },],
    rating: 4.3,
    images: [{
      companyImageId: 'ci01e4e0-d6e2-11eb-b8bc-0242ac130003',
      companyId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
      imageUrl: 'https://www.company1.com/profilePicture.png',
      altText: 'Company 1 profile picture',
    },
    {
      companyImageId: 'ci01e4e0-d6e2-11eb-b8bc-0242ac130004',
      companyId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
      imageUrl: 'https://www.company1.com/solarPanels.png',
      altText: 'Company 1 Solar Panel',
    },
    {
      companyImageId: 'ci01e4e0-d6e2-11eb-b8bc-0242ac130005',
      companyId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
      imageUrl: 'https://www.company1.com/warehouse.png',
      altText: 'Company 1 warehouse',
    },]
  },
  {
    companyId: 'a2b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
    userId: 'abcd-1234-efgh-5679',
    name: 'Company 2',
    description: 'Company 2 description',
    email: 'company2@outlook.com',
    phone: '0123456789',
    webPage: 'https://www.company2.com',
    street: 'Company 2 street',
    streetNumber: 123,
    city: 'Queretaro',
    state: 'Queretaro',
    zipCode: 76152,
    latitude: 20.041296,
    longitude: -120.206199,
    profilePicture: 'https://www.company2.com/profilePicture.png',
    pdfCurriculumUrl: 'https://www.company2.com/pdfCurriculum.pdf',
    pdfDicCdmxUrl: 'https://www.company2.com/pdfDicCdmx.pdf',
    pdfPeeFideUrl: 'https://www.company2.com/pdfPeeFide.pdf',
    pdfGuaranteeSecurityUrl:
      'https://www.company2.com/pdfGuaranteeSecurity.pdf',
    pdfActaConstitutivaUrl: 'https://www.company2.com/pdfActaConstitutiva.pdf',
    pdfIneUrl: 'https://www.company2.com/pdfIne.pdf',
    status: 'rejected',
    rating: 2.5,
    products:[
      {
        productId: 'd2b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        name: 'Product 2',
        description: 'Product 2 description',
        imageUrl: 'https://www.product2.com/image.png',
        imageAltText: 'Product 2 Image',
      },
      {
        productId: 'd3b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        name: 'Product 3',
        description: 'Product 3 description',
        imageUrl: 'https://www.product3.com/image.png',
        imageAltText: 'Product 3 Image',
      },
    ],
    images:[]

  },
  {
    companyId: 'a2c0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
    userId: 'abcd-1234-efgh-5679',
    name: 'Company 3',
    description: 'Company 3 description',
    email: 'company3@outlook.com',
    phone: '0123456789',
    webPage: 'https://www.company3.com',
    street: 'Company 3 street',
    streetNumber: 123,
    city: 'Queretaro',
    state: 'Queretaro',
    zipCode: 76152,
    latitude: 20.041296,
    longitude: -120.206199,
    profilePicture: 'https://www.company3.com/profilePicture.png',
    pdfCurriculumUrl: 'https://www.company3.com/pdfCurriculum.pdf',
    pdfDicCdmxUrl: 'https://www.company3.com/pdfDicCdmx.pdf',
    pdfPeeFideUrl: 'https://www.company3.com/pdfPeeFide.pdf',
    pdfGuaranteeSecurityUrl:
      'https://www.company3.com/pdfGuaranteeSecurity.pdf',
    pdfActaConstitutivaUrl: 'https://www.company3.com/pdfActaConstitutiva.pdf',
    pdfIneUrl: 'https://www.company3.com/pdfIne.pdf',
    status: 'pending_approval',
    rating: null,
    products:[],
    images:[]
  },
]

const attributesToExclude = [
  'createdAt',
  'updatedAt',
  'deletedAt',
]

const extraAttributes = [
  'rating',
  'products',
  'images',
]

beforeEach(async () => {
  await db.drop()
  await initDB()
})

describe('Company Service', () => {
  it('should return all companies', async () => {
    const response = await getAllCompanies({ start: 0, pageSize: 10 })

    expect(response.rows.map((company) => company.get()))
      .excludingEvery(attributesToExclude)
      .excludingEvery(extraAttributes)
      .to.deep.equal(testData)
  })

  it('should return all companies with pagination', async () => {
    const response = await getAllCompanies({ start: 0, pageSize: 1 })

    expect(response.rows.map((company) => company.get()))
      .excludingEvery(attributesToExclude)
      .excludingEvery(extraAttributes)
      .to.deep.equal([testData[0]])
  })

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
})

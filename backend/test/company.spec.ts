import chai from 'chai'
import chaiExclude from 'chai-exclude'
import { db, initDB } from '../src/configs/database.config'
import { getCompanyById } from '../src/services/company.service'

chai.use(chaiExclude)

const { expect } = chai
const testDataId = [
  {
    companyId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
    userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b8',
    name: 'Company 1',
    description: 'Company 1 description',
    email: 'company@outlook.com',
    phone: '8453728592',
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
    products: [
      {
        productId: 'd1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        name: 'Product 1',
        description:
          'Los paneles solares están compuestos por células solares, generalmente hechas de silicio, que tienen la capacidad de generar electricidad cuando son expuestas a la luz',
        imageUrl: 'https://www.product1.com/image.png',
        imageAltText: 'Product 1 Image',
      },
    ],
    score: 4.3,
    oneComment: 'This is a comment',
    images: [
      {
        companyImageId: '7f9a3d21-6b49-4e7c-ae56-1b0e8fcd9821',
        companyId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        imageUrl:
          'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1758&q=80',
        altText: 'Company 1 profile picture',
      },
      {
        companyImageId: '7f9a3d21-6b49-4e7c-ae56-1b0e8fcd9822',
        companyId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        imageUrl:
          'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1772&q=80',
        altText: 'Company 1 Solar Panel',
      },
      {
        companyImageId: '7f9a3d21-6b49-4e7c-ae56-1b0e8fcd9823',
        companyId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        imageUrl:
          'https://images.unsplash.com/photo-1595437193398-f24279553f4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80',
        altText: 'Company 1 warehouse',
      },
    ],
  },
  {
    companyId: 'a2b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
    userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b9',
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
    score: 2.5,
    products: [
      {
        productId: 'd2b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        name: 'Product 2',
        description: 'Product 2 description',
        imageUrl:
          'https://images.adsttc.com/media/images/5ed5/4a01/b357/6538/ab00/048b/newsletter/aec-daily-solar-lighting_(2).jpg?1591036359',
        imageAltText: 'Product 2 Image',
      },
      {
        productId: 'd3b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        name: 'Product 3',
        description: 'Product 3 description',
        imageUrl:
          'https://www.iberdrola.com/documents/20125/40918/Renovables_746x419.jpeg/171c88c6-834d-5309-0e0e-f758530dc3a9?t=1627967517593',
        imageAltText: 'Product 3 Image',
      },
    ],
    images: [],
  },
  {
    companyId: 'a2c0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
    userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b8',
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
    score: null,
    products: [],
    images: [],
  },
]


const attributesToExclude = [
  'createdAt',
  'updatedAt',
  'deletedAt',
  'products',
  'images',
]

beforeEach(async () => {
  await db.drop()
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
      .to.deep.equal(testDataId[0])
  })

  it('should return null if company does not exist', async () => {
    const response = await getCompanyById(
      'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7f'
    )
    expect(response).to.be.null
  })
})
import chai from 'chai'
import chaiExclude from 'chai-exclude'
import { db, initDB } from '../src/configs/database.config'
import {
  getAllCompanies,
  getPendingCompanies,
} from '../src/services/company.service'
import { unwrap } from './utils'

chai.use(chaiExclude)

const { expect } = chai
const testData = [
  {
    companyId: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    userId: 'abcd-1234-efgh-5679',
    name: 'Company 1',
    description: 'Company 1 description',
    email: 'example1@mail.com',
    phoneNumber: '123456789',
    webPage: 'www.company1.com',
    street: '123 Main Street',
    streetNumber: 456,
    city: 'Cityville',
    state: 'Stateville',
    zipCode: 12345,
    profilePicture:
      'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcR6XZP6rdW3VhHwZSxu3u4RCWyQFHTwl_4QSRK5t0km1FCytdaWwJEoNmW8c2ju5DRR4DbxppAQvVH441I',
    pdfCurriculumURL: 'https://example.com/company1-cv.pdf',
    pdfDicCdmxURL: 'https://example.com/company1-dic-cdmx.pdf',
    pdfPeeFideURL: 'https://example.com/company1-pee-fide.pdf',
    pdfGuaranteeSecurityURL:
      'https://example.com/company1-guarantee-security.pdf',
    pdfActaConstitutivaURL:
      'https://example.com/company1-acta-constitutiva.pdf',
    pdfINEURL: 'https://example.com/company1-ine.pdf',
    status: 'pending_approval',
  },
  {
    companyId: '3d6f0f67-40e5-4d58-8cb9-02b8d7a9d140',
    userId: 'abcd-1234-efgh-5680',
    name: 'Company 2',
    description: 'Company 2 description',
    email: 'example2@mail.com',
    phoneNumber: '123456790',
    webPage: 'www.company2.com',
    street: '123 Main Street',
    streetNumber: 456,
    city: 'Cityville',
    state: 'Stateville',
    zipCode: 12345,
    profilePicture:
      'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcR6XZP6rdW3VhHwZSxu3u4RCWyQFHTwl_4QSRK5t0km1FCytdaWwJEoNmW8c2ju5DRR4DbxppAQvVH441I',
    pdfCurriculumURL: 'https://example.com/company2-cv.pdf',
    pdfDicCdmxURL: 'https://example.com/company2-dic-cdmx.pdf',
    pdfPeeFideURL: 'https://example.com/company2-pee-fide.pdf',
    pdfGuaranteeSecurityURL:
      'https://example.com/company2-guarantee-security.pdf',
    pdfActaConstitutivaURL:
      'https://example.com/company2-acta-constitutiva.pdf',
    pdfINEURL: 'https://example.com/company2-ine.pdf',
    status: 'pending_approval',
  },
  {
    companyId: '5a8f29b5-98f0-41c4-a98f-0fb8ec22d7e7',
    userId: 'abcd-1234-efgh-5681',
    name: 'Company 3',
    description: 'Company 3 description',
    email: 'example3@mail.com',
    phoneNumber: '123456791',
    webPage: 'www.company3.com',
    street: '123 Main Street',
    streetNumber: 456,
    city: 'Cityville',
    state: 'Stateville',
    zipCode: 12345,
    profilePicture:
      'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcR6XZP6rdW3VhHwZSxu3u4RCWyQFHTwl_4QSRK5t0km1FCytdaWwJEoNmW8c2ju5DRR4DbxppAQvVH441I',
    pdfCurriculumURL: 'https://example.com/company3-cv.pdf',
    pdfDicCdmxURL: 'https://example.com/company3-dic-cdmx.pdf',
    pdfPeeFideURL: 'https://example.com/company3-pee-fide.pdf',
    pdfGuaranteeSecurityURL:
      'https://example.com/company3-guarantee-security.pdf',
    pdfActaConstitutivaURL:
      'https://example.com/company3-acta-constitutiva.pdf',
    pdfINEURL: 'https://example.com/company3-ine.pdf',
    status: 'pending_approval',
  },
  {
    companyId: '7e20e812-632e-4c25-8124-326f236db9bf',
    userId: 'abcd-1234-efgh-5682',
    name: 'Company 4',
    description: 'Company 4 description',
    email: 'example4@mail.com',
    phoneNumber: '123456792',
    webPage: 'www.company4.com',
    street: '123 Main Street',
    streetNumber: 456,
    city: 'Cityville',
    state: 'Stateville',
    zipCode: 12345,
    profilePicture:
      'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcR6XZP6rdW3VhHwZSxu3u4RCWyQFHTwl_4QSRK5t0km1FCytdaWwJEoNmW8c2ju5DRR4DbxppAQvVH441I',
    pdfCurriculumURL: 'https://example.com/company4-cv.pdf',
    pdfDicCdmxURL: 'https://example.com/company4-dic-cdmx.pdf',
    pdfPeeFideURL: 'https://example.com/company4-pee-fide.pdf',
    pdfGuaranteeSecurityURL:
      'https://example.com/company4-guarantee-security.pdf',
    pdfActaConstitutivaURL:
      'https://example.com/company4-acta-constitutiva.pdf',
    pdfINEURL: 'https://example.com/company4-ine.pdf',
    status: 'pending_approval',
  },
  {
    companyId: '2b5de26a-041d-4ea6-a144-3e36c0e28961',
    userId: 'abcd-1234-efgh-5683',
    name: 'Company 5',
    description: 'Company 5 description',
    email: 'example5@mail.com',
    phoneNumber: '123456793',
    webPage: 'www.company5.com',
    street: '123 Main Street',
    streetNumber: 456,
    city: 'Cityville',
    state: 'Stateville',
    zipCode: 12345,
    profilePicture:
      'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcR6XZP6rdW3VhHwZSxu3u4RCWyQFHTwl_4QSRK5t0km1FCytdaWwJEoNmW8c2ju5DRR4DbxppAQvVH441I',
    pdfCurriculumURL: 'https://example.com/company5-cv.pdf',
    pdfDicCdmxURL: 'https://example.com/company5-dic-cdmx.pdf',
    pdfPeeFideURL: 'https://example.com/company5-pee-fide.pdf',
    pdfGuaranteeSecurityURL:
      'https://example.com/company5-guarantee-security.pdf',
    pdfActaConstitutivaURL:
      'https://example.com/company5-acta-constitutiva.pdf',
    pdfINEURL: 'https://example.com/company5-ine.pdf',
    status: 'pending_approval',
  },
  {
    companyId: '6d5e7b2d-9c1e-4d4e-baa7-07b0b874401c',
    userId: 'abcd-1234-efgh-5684',
    name: 'Company 6',
    description: 'Company 6 description',
    email: 'example6@mail.com',
    phoneNumber: '123456794',
    webPage: 'www.company6.com',
    street: '123 Main Street',
    streetNumber: 456,
    city: 'Cityville',
    state: 'Stateville',
    zipCode: 12345,
    profilePicture:
      'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcR6XZP6rdW3VhHwZSxu3u4RCWyQFHTwl_4QSRK5t0km1FCytdaWwJEoNmW8c2ju5DRR4DbxppAQvVH441I',
    pdfCurriculumURL: 'https://example.com/company6-cv.pdf',
    pdfDicCdmxURL: 'https://example.com/company6-dic-cdmx.pdf',
    pdfPeeFideURL: 'https://example.com/company6-pee-fide.pdf',
    pdfGuaranteeSecurityURL:
      'https://example.com/company6-guarantee-security.pdf',
    pdfActaConstitutivaURL:
      'https://example.com/company6-acta-constitutiva.pdf',
    pdfINEURL: 'https://example.com/company6-ine.pdf',
    status: 'pending_approval',
  },
  {
    companyId: '8a604e88-74f3-4f4e-8b64-836bfa86b5d2',
    userId: 'abcd-1234-efgh-5685',
    name: 'Company 7',
    description: 'Company 7 description',
    email: 'example7@mail.com',
    phoneNumber: '123456795',
    webPage: 'www.company7.com',
    street: 'Lago de Chapala',
    streetNumber: 167,
    city: 'Queretaro',
    state: 'Queretaro',
    zipCode: 76230,
    profilePicture:
      'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcR6XZP6rdW3VhHwZSxu3u4RCWyQFHTwl_4QSRK5t0km1FCytdaWwJEoNmW8c2ju5DRR4DbxppAQvVH441I',
    pdfCurriculumURL: 'https://example.com/company7-cv.pdf',
    pdfDicCdmxURL: 'https://example.com/company7-dic-cdmx.pdf',
    pdfPeeFideURL: 'https://example.com/company7-pee-fide.pdf',
    pdfGuaranteeSecurityURL:
      'https://example.com/company7-guarantee-security.pdf',
    pdfActaConstitutivaURL:
      'https://example.com/company7-acta-constitutiva.pdf',
    pdfINEURL: 'https://example.com/company7-ine.pdf',
    status: 'pending_approval',
  },
  {
    companyId: 'bc0f09b1-22b0-4a54-a9f0-5935c9590aeb',
    userId: 'abcd-1234-efgh-5686',
    name: 'Company 8',
    description: 'Company 8 description',
    email: 'example8@mail.com',
    phoneNumber: '123456796',
    webPage: 'www.company8.com',
    street: 'Blvd. villas del Meson',
    streetNumber: 18,
    city: 'Queretaro',
    state: 'Queretaro',
    zipCode: 76230,
    profilePicture:
      'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcR6XZP6rdW3VhHwZSxu3u4RCWyQFHTwl_4QSRK5t0km1FCytdaWwJEoNmW8c2ju5DRR4DbxppAQvVH441I',
    pdfCurriculumURL: 'https://example.com/company8-cv.pdf',
    pdfDicCdmxURL: 'https://example.com/company8-dic-cdmx.pdf',
    pdfPeeFideURL: 'https://example.com/company8-pee-fide.pdf',
    pdfGuaranteeSecurityURL:
      'https://example.com/company8-guarantee-security.pdf',
    pdfActaConstitutivaURL:
      'https://example.com/company8-acta-constitutiva.pdf',
    pdfINEURL: 'https://example.com/company8-ine.pdf',
    status: 'pending_approval',
  },
  {
    companyId: 'e6ad188a-5baf-4b95-8c16-5a11d10a7ebc',
    userId: 'abcd-1234-efgh-5687',
    name: 'Company 9',
    description: 'Company 9 description',
    email: 'example9@mail.com',
    phoneNumber: '123456797',
    webPage: 'www.company9.com',
    street: 'Hacienda Grande',
    streetNumber: 1405,
    city: 'Queretaro',
    state: 'Queretaro',
    zipCode: 76180,
    profilePicture:
      'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcR6XZP6rdW3VhHwZSxu3u4RCWyQFHTwl_4QSRK5t0km1FCytdaWwJEoNmW8c2ju5DRR4DbxppAQvVH441I',
    pdfCurriculumURL: 'https://example.com/company9-cv.pdf',
    pdfDicCdmxURL: 'https://example.com/company9-dic-cdmx.pdf',
    pdfPeeFideURL: 'https://example.com/company9-pee-fide.pdf',
    pdfGuaranteeSecurityURL:
      'https://example.com/company9-guarantee-security.pdf',
    pdfActaConstitutivaURL:
      'https://example.com/company9-acta-constitutiva.pdf',
    pdfINEURL: 'https://example.com/company9-ine.pdf',
    status: 'approved',
  },
  {
    companyId: 'f17ff7a5-d808-43f9-af1a-127f6f0c1b4e',
    userId: 'abcd-1234-efgh-5688',
    name: 'Company 10',
    description: 'Company 10 description',
    email: 'example10@mail.com',
    phoneNumber: '123456798',
    webPage: 'www.company10.com',
    street: 'C. Monte Cárpatos',
    streetNumber: 204,
    city: 'Queretaro',
    state: 'Queretaro',
    zipCode: 76116,
    profilePicture:
      'https://encryptesd-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcR6XZP6rdW3VhHwZSxu3u4RCWyQFHTwl_4QSRK5t0km1FCytdaWwJEoNmW8c2ju5DRR4DbxppAQvVH441I',
    pdfCurriculumURL: 'https://example.com/company10-cv.pdf',
    pdfDicCdmxURL: 'https://example.com/company10-dic-cdmx.pdf',
    pdfPeeFideURL: 'https://example.com/company10-pee-fide.pdf',
    pdfGuaranteeSecurityURL:
      'https://example.com/company10-guarantee-security.pdf',
    pdfActaConstitutivaURL:
      'https://example.com/company10-acta-constitutiva.pdf',
    pdfINEURL: 'https://example.com/company10-ine.pdf',
    status: 'approved',
  },
]

const attributesToExclude = [
  'companyId',
  'createdAt',
  'updatedAt',
  'profilePicture',
  'webPage',
]

beforeEach(async () => {
  await db.drop()
  await initDB()
})

afterEach(async () => {
})

describe('Company Service', () => {
  it('should return a list of all companies', async () => {
    const response = await getAllCompanies({ start: 0, pageSize: 10 })
    expect(unwrap(response).rows)
      .excluding(attributesToExclude)
      .to.deep.equal(testData)
  })
})

describe('Company Service', () => {
  it('should return a list of all pending companies', async () => {
    const response = await getPendingCompanies({ start: 0, pageSize: 10 })
    expect(unwrap(response).rows)
      .excluding(attributesToExclude)
      .to.deep.equal(testData.filter((company) => company.status == 'pending_approval'))
  })
})

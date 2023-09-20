import Company from '../models/company.model'
import { Bootstrapper } from './Bootstraper'

export default class CompanyBootstrap extends Bootstrapper {
  async run() {
    await Company.bulkCreate([
      {
        companyId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b8',
        name: 'Company 1',
        description: 'Company 1 description',
        email: 'example1@mail.com',
        phone: '123456789',
        webPage: 'www.company1.com',
        street: '123 Main Street',
        streetNumber: 456,
        city: 'Cityville',
        state: 'Stateville',
        zipCode: 12345,
        profilePicture:
          'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcR6XZP6rdW3VhHwZSxu3u4RCWyQFHTwl_4QSRK5t0km1FCytdaWwJEoNmW8c2ju5DRR4DbxppAQvVH441I',
        pdfCurriculumUrl: 'https://examplea.com/company1-cv.pdf',
        pdfDicCdmxUrl: 'https://examplea.com/company1-dic-cdmx.pdf',
        pdfPeeFideUrl: 'https://examplea.com/company1-pee-fide.pdf',
        pdfGuaranteeSecurityUrl:
          'https://examplea.com/company1-guarantee-security.pdf',
        pdfActaConstitutivaUrl:
          'https://examplea.com/company1-acta-constitutiva.pdf',
        pdfIneUrl: 'https://examplea.com/company1-ine.pdf',
        status: 'pending_approval',
      },
      {
        companyId: 'a2b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b9',
        name: 'Company 2',
        description: 'Company 2 description',
        email: 'example2@mail.com',
        phone: '123456790',
        webPage: 'www.company2.com',
        street: '123 Main Street',
        streetNumber: 456,
        city: 'Cityville',
        state: 'Stateville',
        zipCode: 12345,
        profilePicture:
          'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcR6XZP6rdW3VhHwZSxu3u4RCWyQFHTwl_4QSRK5t0km1FCytdaWwJEoNmW8c2ju5DRR4DbxppAQvVH441I',
        pdfCurriculumUrl: 'https://exampleb.com/company2-cv.pdf',
        pdfDicCdmxUrl: 'https://exampleb.com/company2-dic-cdmx.pdf',
        pdfPeeFideUrl: 'https://exampleb.com/company2-pee-fide.pdf',
        pdfGuaranteeSecurityUrl:
          'https://exampleb.com/company2-guarantee-security.pdf',
        pdfActaConstitutivaUrl:
          'https://exampleb.com/company2-acta-constitutiva.pdf',
        pdfIneUrl: 'https://exampleb.com/company2-ine.pdf',
        status: 'pending_approval',
      },
      {
        companyId: 'a2c0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b7',
        name: 'Company 3',
        description: 'Company 3 description',
        email: 'example3@mail.com',
        phone: '123456791',
        webPage: 'www.company3.com',
        street: '123 Main Street',
        streetNumber: 456,
        city: 'Cityville',
        state: 'Stateville',
        zipCode: 12345,
        profilePicture:
          'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcR6XZP6rdW3VhHwZSxu3u4RCWyQFHTwl_4QSRK5t0km1FCytdaWwJEoNmW8c2ju5DRR4DbxppAQvVH441I',
        pdfCurriculumUrl: 'https://examplec.com/company3-cv.pdf',
        pdfDicCdmxUrl: 'https://examplec.com/company3-dic-cdmx.pdf',
        pdfPeeFideUrl: 'https://examplec.com/company3-pee-fide.pdf',
        pdfGuaranteeSecurityUrl:
          'https://examplec.com/company3-guarantee-security.pdf',
        pdfActaConstitutivaUrl:
          'https://examplec.com/company3-acta-constitutiva.pdf',
        pdfIneUrl: 'https://examplec.com/company3-ine.pdf',
        status: 'pending_approval',
      },
      {
        companyId: 'comp-1234-efgh-0003',
        userId: 'abcd-1234-efgh-5682',
        name: 'Company 4',
        description: 'Company 4 description',
        email: 'example4@mail.com',
        phone: '123456792',
        webPage: 'www.company4.com',
        street: '123 Main Street',
        streetNumber: 456,
        city: 'Cityville',
        state: 'Stateville',
        zipCode: 12345,
        profilePicture:
          'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcR6XZP6rdW3VhHwZSxu3u4RCWyQFHTwl_4QSRK5t0km1FCytdaWwJEoNmW8c2ju5DRR4DbxppAQvVH441I',
        pdfCurriculumUrl: 'https://exampled.com/company4-cv.pdf',
        pdfDicCdmxUrl: 'https://exampled.com/company4-dic-cdmx.pdf',
        pdfPeeFideUrl: 'https://exampled.com/company4-pee-fide.pdf',
        pdfGuaranteeSecurityUrl:
          'https://exampled.com/company4-guarantee-security.pdf',
        pdfActaConstitutivaUrl:
          'https://exampled.com/company4-acta-constitutiva.pdf',
        pdfIneUrl: 'https://exampled.com/company4-ine.pdf',
        status: 'pending_approval',
      },
      {
        companyId: 'comp-1234-efgh-0004',
        userId: 'abcd-1234-efgh-5683',
        name: 'Company 5',
        description: 'Company 5 description',
        email: 'example5@mail.com',
        phone: '123456793',
        webPage: 'www.company5.com',
        street: '123 Main Street',
        streetNumber: 456,
        city: 'Cityville',
        state: 'Stateville',
        zipCode: 12345,
        profilePicture:
          'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcR6XZP6rdW3VhHwZSxu3u4RCWyQFHTwl_4QSRK5t0km1FCytdaWwJEoNmW8c2ju5DRR4DbxppAQvVH441I',
        pdfCurriculumUrl: 'https://examplee.com/company5-cv.pdf',
        pdfDicCdmxUrl: 'https://examplee.com/company5-dic-cdmx.pdf',
        pdfPeeFideUrl: 'https://examplee.com/company5-pee-fide.pdf',
        pdfGuaranteeSecurityUrl:
          'https://examplee.com/company5-guarantee-security.pdf',
        pdfActaConstitutivaUrl:
          'https://examplee.com/company5-acta-constitutiva.pdf',
        pdfIneUrl: 'https://examplee.com/company5-ine.pdf',
        status: 'pending_approval',
      },
      {
        companyId: 'comp-1234-efgh-0005',
        userId: 'abcd-1234-efgh-5684',
        name: 'Company 6',
        description: 'Company 6 description',
        email: 'example6@mail.com',
        phone: '123456794',
        webPage: 'www.company6.com',
        street: '123 Main Street',
        streetNumber: 456,
        city: 'Cityville',
        state: 'Stateville',
        zipCode: 12345,
        profilePicture:
          'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcR6XZP6rdW3VhHwZSxu3u4RCWyQFHTwl_4QSRK5t0km1FCytdaWwJEoNmW8c2ju5DRR4DbxppAQvVH441I',
        pdfCurriculumUrl: 'https://examplef.com/company6-cv.pdf',
        pdfDicCdmxUrl: 'https://examplef.com/company6-dic-cdmx.pdf',
        pdfPeeFideUrl: 'https://examplef.com/company6-pee-fide.pdf',
        pdfGuaranteeSecurityUrl:
          'https://examplef.com/company6-guarantee-security.pdf',
        pdfActaConstitutivaUrl:
          'https://examplef.com/company6-acta-constitutiva.pdf',
        pdfIneUrl: 'https://examplef.com/company6-ine.pdf',
        status: 'pending_approval',
      },
      {
        companyId: 'comp-1234-efgh-0006',
        userId: 'abcd-1234-efgh-5685',
        name: 'Company 7',
        description: 'Company 7 description',
        email: 'example7@mail.com',
        phone: '123456795',
        webPage: 'www.company7.com',
        street: '123 Main Street',
        streetNumber: 456,
        city: 'Cityville',
        state: 'Stateville',
        zipCode: 12345,
        profilePicture:
          'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcR6XZP6rdW3VhHwZSxu3u4RCWyQFHTwl_4QSRK5t0km1FCytdaWwJEoNmW8c2ju5DRR4DbxppAQvVH441I',
        pdfCurriculumUrl: 'https://exampleg.com/company7-cv.pdf',
        pdfDicCdmxUrl: 'https://exampleg.com/company7-dic-cdmx.pdf',
        pdfPeeFideUrl: 'https://exampleg.com/company7-pee-fide.pdf',
        pdfGuaranteeSecurityUrl:
          'https://exampleg.com/company7-guarantee-security.pdf',
        pdfActaConstitutivaUrl:
          'https://exampleg.com/company7-acta-constitutiva.pdf',
        pdfIneUrl: 'https://exampleg.com/company7-ine.pdf',
        status: 'pending_approval',
      },
      {
        companyId: 'comp-1234-efgh-0007',
        userId: 'abcd-1234-efgh-5686',
        name: 'Company 8',
        description: 'Company 8 description',
        email: 'example8@mail.com',
        phone: '123456796',
        webPage: 'www.company8.com',
        street: '123 Main Street',
        streetNumber: 456,
        city: 'Cityville',
        state: 'Stateville',
        zipCode: 12345,
        profilePicture:
          'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcR6XZP6rdW3VhHwZSxu3u4RCWyQFHTwl_4QSRK5t0km1FCytdaWwJEoNmW8c2ju5DRR4DbxppAQvVH441I',
        pdfCurriculumUrl: 'https://exampleh.com/company8-cv.pdf',
        pdfDicCdmxUrl: 'https://exampleh.com/company8-dic-cdmx.pdf',
        pdfPeeFideUrl: 'https://exampleh.com/company8-pee-fide.pdf',
        pdfGuaranteeSecurityUrl:
          'https://exampleh.com/company8-guarantee-security.pdf',
        pdfActaConstitutivaUrl:
          'https://exampleh.com/company8-acta-constitutiva.pdf',
        pdfIneUrl: 'https://exampleh.com/company8-ine.pdf',
        status: 'pending_approval',
      },
      {
        companyId: 'comp-1234-efgh-0008',
        userId: 'abcd-1234-efgh-5687',
        name: 'Company 9',
        description: 'Company 9 description',
        email: 'example9@mail.com',
        phone: '123456797',
        webPage: 'www.company9.com',
        street: '123 Main Street',
        streetNumber: 456,
        city: 'Cityville',
        state: 'Stateville',
        zipCode: 12345,
        profilePicture:
          'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcR6XZP6rdW3VhHwZSxu3u4RCWyQFHTwl_4QSRK5t0km1FCytdaWwJEoNmW8c2ju5DRR4DbxppAQvVH441I',
        pdfCurriculumUrl: 'https://examplei.com/company9-cv.pdf',
        pdfDicCdmxUrl: 'https://examplei.com/company9-dic-cdmx.pdf',
        pdfPeeFideUrl: 'https://examplei.com/company9-pee-fide.pdf',
        pdfGuaranteeSecurityUrl:
          'https://examplei.com/company9-guarantee-security.pdf',
        pdfActaConstitutivaUrl:
          'https://examplei.com/company9-acta-constitutiva.pdf',
        pdfIneUrl: 'https://examplei.com/company9-ine.pdf',
        status: 'pending_approval',
      },
      {
        companyId: 'comp-1234-efgh-0009',
        userId: 'abcd-1234-efgh-5688',
        name: 'Company 10',
        description: 'Company 10 description',
        email: 'example10@mail.com',
        phone: '123456798',
        webPage: 'www.company10.com',
        street: '123 Main Street',
        streetNumber: 456,
        city: 'Cityville',
        state: 'Stateville',
        zipCode: 12345,
        profilePicture:
          'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcR6XZP6rdW3VhHwZSxu3u4RCWyQFHTwl_4QSRK5t0km1FCytdaWwJEoNmW8c2ju5DRR4DbxppAQvVH441I',
        pdfCurriculumUrl: 'https://examplej.com/company10-cv.pdf',
        pdfDicCdmxUrl: 'https://examplej.com/company10-dic-cdmx.pdf',
        pdfPeeFideUrl: 'https://examplej.com/company10-pee-fide.pdf',
        pdfGuaranteeSecurityUrl:
          'https://examplej.com/company10-guarantee-security.pdf',
        pdfActaConstitutivaUrl:
          'https://examplej.com/company10-acta-constitutiva.pdf',
        pdfIneUrl: 'https://examplej.com/company10-ine.pdf',
        status: 'pending_approval',
      },
    ])
  }
}

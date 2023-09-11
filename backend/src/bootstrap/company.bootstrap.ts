import Company from '../models/company.model'
import { Bootstrapper } from './Bootstraper'

export default class CompanyBootstrap extends Bootstrapper {
  async run() {
    Company.bulkCreate([
      {
        companyId: 'comp-1234-efgh-0000',
        name: 'Company 1',
        description: 'Company 1 description',
        email: 'example1@mail.com',
        phoneNumber: '123456789',
        webPage: 'www.company1.com',
        street: 'Company 1 street',
        streetNumber: 1,
        city: 'Company 1 city',
        state: 'Company 1 state',
        zipCode: '12345',
        latitude: 1.111111,
        longitude: 1.111111,
        profilePicture: 'https://picsum.photos/200',
        pdfCurriculumUrl: 'https://picsum.photos/200',
        pdfDicCdmxUrl: 'https://picsum.photos/200',
        pdfPeeFideUrl: 'https://picsum.photos/200',
        pdfGuaranteeSecurityUrl: 'https://picsum.photos/200',
        pdfActaConstitutivaUrl: 'https://picsum.photos/200',
        pdfIneUrl: 'https://picsum.photos/200',
        status: 'approved',
      },
      {
        companyId: 'comp-5678-efgh-0000',
        name: 'Company 2',
        description: 'Company 2 description',
        email: 'example2@mail.com',
        phoneNumber: '123456780',
        street: 'Company 2 street',
        streetNumber: 2,
        city: 'Company 2 city',
        state: 'Company 2 state',
        zipCode: '12346',
        latitude: 0.111111,
        longitude: 1.111111,
        pdfCurriculumUrl: 'https://picsum.photos/100',
        pdfGuaranteeSecurityUrl: 'https://picsum.photos/100',
        pdfActaConstitutivaUrl: 'https://picsum.photos/100',
        pdfIneUrl: 'https://picsum.photos/100',
        status: 'pending_approval',
      },
      
    ])
  }
}

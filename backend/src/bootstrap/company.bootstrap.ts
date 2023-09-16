import Company from '../models/company.model'
import { Bootstrapper } from './Bootstraper'

export default class CompanyBootstrap extends Bootstrapper {
  async run() {
    await Company.bulkCreate([
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
        pdfActaConstitutivaUrl:
          'https://www.company1.com/pdfActaConstitutiva.pdf',
        pdfIneUrl: 'https://www.company1.com/pdfIne.pdf',
        status: 'approved',
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
        pdfActaConstitutivaUrl:
          'https://www.company2.com/pdfActaConstitutiva.pdf',
        pdfIneUrl: 'https://www.company2.com/pdfIne.pdf',
        status: 'rejected',
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
        pdfActaConstitutivaUrl:
          'https://www.company3.com/pdfActaConstitutiva.pdf',
        pdfIneUrl: 'https://www.company3.com/pdfIne.pdf',
        status: 'pending_approval',
      },
    ])
  }
}

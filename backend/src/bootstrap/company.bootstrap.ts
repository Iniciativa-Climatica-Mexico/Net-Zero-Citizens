import Company from '../models/company.model'
import { Bootstrapper } from './Bootstraper'

export default class CompanyBootstrap extends Bootstrapper {
  async run() {
    await Company.bulkCreate([
      {
        companyId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b8',
        name: 'SUNPOWER',
        oneComment: 'This is a comment',
        description: 'Más potencia en condiciones del mundo real',
        email: 'contact@sunpower.com',
        phone: '8453728592',
        webPage: 'https://www.sunpower.com',
        street: 'Las Lomas Verdes',
        streetNumber: '123',
        city: 'Ciudad de México',
        state: 'CDMX',
        zipCode: '72000',
        score: 4.3,
        profilePicture:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Sunpower_logo.svg/2560px-Sunpower_logo.svg.png',
        pdfCurriculumUrl: 'https://www.company1.com/pdfCurriculum.pdf',
        pdfDicCdmxUrl: 'https://www.company1.com/pdfDicCdmx.pdf',
        pdfPeeFideUrl: 'https://www.company1.com/pdfPeeFide.pdf',
        pdfGuaranteeSecurityUrl:
          'https://www.company1.com/pdfGuaranteeSecurity.pdf',
        pdfActaConstitutivaUrl:
          'https://example.com/company1-acta-constitutiva.pdf',
        pdfIneUrl: 'https://example.com/company1-ine.pdf',
        status: 'approved',
      },
      {
        companyId: 'a2b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b9',
        name: 'Exel Solar',
        description: 'Company 2 description',
        email: 'company2@outlook.com',
        phone: '0123456799',
        webPage: 'https://www.company2.com',
        street: 'Company 2 street',
        streetNumber: '123',
        city: 'Queretaro',
        state: 'QRO',
        zipCode: '76152',
        profilePicture:
          'https://latam.apsystems.com/wp-content/uploads/2018/08/apsystems-exelsolar.png',
        pdfCurriculumUrl: 'https://www.company2.com/pdfCurriculum.pdf',
        pdfDicCdmxUrl: 'https://www.company2.com/pdfDicCdmx.pdf',
        pdfPeeFideUrl: 'https://www.company2.com/pdfPeeFide.pdf',
        pdfGuaranteeSecurityUrl:
          'https://www.company2.com/pdfGuaranteeSecurity.pdf',
        pdfActaConstitutivaUrl:
          'https://example.com/company2-acta-constitutiva.pdf',
        pdfIneUrl: 'https://example.com/company2-ine.pdf',
        status: 'rejected',
      },
      {
        companyId: 'a2c0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b7',
        name: 'TESLA ENERGY',
        description: 'Company 3 description',
        email: 'company3@outlook.com',
        phone: '0126756789',
        webPage: 'https://www.company3.com',
        street: 'Company 3 street',
        streetNumber: '123',
        city: 'Ciudad de México',
        state: 'CDMX',
        zipCode: '76152',
        profilePicture:
          'https://cdn11.bigcommerce.com/s-3nrr5bfo5i/product_images/uploaded_images/tesla-logo.png',
        pdfCurriculumUrl: 'https://www.company3.com/pdfCurriculum.pdf',
        pdfDicCdmxUrl: 'https://www.company3.com/pdfDicCdmx.pdf',
        pdfPeeFideUrl: 'https://www.company3.com/pdfPeeFide.pdf',
        pdfGuaranteeSecurityUrl:
          'https://example.com/company10-guarantee-security.pdf',
        pdfActaConstitutivaUrl:
          'https://example.com/company10-acta-constitutiva.pdf',
        pdfIneUrl: 'https://example.com/company10-ine.pdf',
        status: 'pending_approval',
      },
    ])
  }
}

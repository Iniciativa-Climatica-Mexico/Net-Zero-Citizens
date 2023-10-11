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
        email: 'jn7924@gmail.com',
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
    ])
  }
}

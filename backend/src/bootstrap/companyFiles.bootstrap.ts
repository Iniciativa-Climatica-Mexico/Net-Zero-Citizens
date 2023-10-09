import CompanyFiles from '../models/companyFiles.model'
import { Bootstrapper } from './Bootstraper'

export default class CompanyFilesBootstrap extends Bootstrapper {
  async run() {
    await CompanyFiles.bulkCreate([
      {
        companyFileId: '7f9a3d21-6b49-4e7c-ae56-1b0e8fcd9821',
        companyId: 'a2c0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        fileUrl:
          'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1758&q=80',
        fileDescription: 'Imagen',
      },
      {
        companyFileId: '7f9a3d21-6b49-4e7c-ae56-1b0e8fcd9822',
        companyId: 'a2c0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        fileUrl:
          'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1772&q=80',
        fileDescription: 'Imagen',
      },
      {
        companyFileId: '7f9a3d21-6b49-4e7c-ae56-1b0e8fcd9823',
        companyId: 'a2c0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
        fileUrl:
          'https://images.unsplash.com/photo-1595437193398-f24279553f4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80',
        fileDescription: 'Imagen',
      },
    ])
  }
}

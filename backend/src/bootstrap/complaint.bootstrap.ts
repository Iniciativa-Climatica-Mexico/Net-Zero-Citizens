import { Bootstrapper } from './Bootstraper'
import Complaint from '../models/complaint.model'

export default class ComplaintBootstrap extends Bootstrapper {
  async run() {
    Complaint.bulkCreate([
      {
        complaintId: 'comp-1234-efgh-0000',
        userId: 'user-1234-efgh-0000',
        companyId: 'comp-1234-efgh-0009',
        complaintSubject: 'Productos Defectuosos',
      },
      {
        complaintId: 'comp-1235-efgh-0000',
        userId: 'user-1234-efgh-0000',
        companyId: 'comp-1234-efgh-0009',
        complaintSubject: 'Inconformidad con el producto / servicio',
      },
      {
        complaintId: 'comp-1236-efgh-0000',
        userId: 'user-1234-efgh-0000',
        companyId: 'comp-1234-efgh-0009',
        complaintSubject: 'Comportamiento Inapropiado',
        complaintDescription: 'El vendedor me insultó',
      },
      {
        complaintId: 'comp-1237-efgh-0000',
        userId: 'user-1234-efgh-0000',
        companyId: 'comp-1234-efgh-0009',
        complaintSubject: 'Mal Servicio',
        complaintDescription: 'aaaaaaaaaaaaaaaaaaaaaaaaaa',
      }
    ])
  }
}

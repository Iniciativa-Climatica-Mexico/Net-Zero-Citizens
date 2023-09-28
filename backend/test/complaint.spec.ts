import chai from 'chai'
import chaiExclude from 'chai-exclude'
import { db, initDB } from '../src/configs/database.config'
import { unwrap } from './utils'
import * as ComplaintService from '../src/services/complaints.service'

chai.use(chaiExclude)
const { expect } = chai

const testComplaints = [
  {
    complaintId: 'compl-1234-efgh-0000',
    userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b8',
    companyId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
    complaintSubject: 'Productos Defectuosos',
    complaintDescription: 'El vendedor me insultó',
    complaintStatus: 'active',
  },
  {
    complaintId: 'compl-1235-efgh-0000',
    userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b8',
    companyId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
    complaintSubject: 'Inconformidad con el producto / servicio',
    complaintDescription: 'El vendedor me insultó',
    complaintStatus: 'active',
  },
  {
    companyId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
    complaintDescription: 'El vendedor me insultó',
    complaintId: 'compl-1236-efgh-0000',
    complaintStatus: 'active',
    complaintSubject: 'Comportamiento Inapropiado',
    userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b8',
  },
  {
    companyId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
    complaintDescription: 'aaaaaaaaaaaaaaaaaaaaaaaaaa',
    complaintId: 'compl-1237-efgh-0000',
    complaintStatus: 'active',
    complaintSubject: 'Mal Servicio',
    userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b8',
  },
]

const attributesToExclude = ['createdAt', 'updatedAt']

beforeEach(async () => {
  await db.drop()
  await initDB()
})

describe('Complaints Service', () => {
  it('should return a list of all complaints', async () => {
    const response = await ComplaintService.getAllComplaints({
      start: 0,
      pageSize: 10,
    })
    expect(unwrap(response).rows)
      .excluding(attributesToExclude)
      .to.deep.equal(testComplaints)
  })
})

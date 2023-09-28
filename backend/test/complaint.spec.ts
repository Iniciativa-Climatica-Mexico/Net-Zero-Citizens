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
    company: { name: 'SUNPOWER' },
    user: { firstName: 'John', lastName: 'Doe' },
  },
  {
    complaintId: 'compl-1235-efgh-0000',
    userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b9',
    companyId: 'a2b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
    complaintSubject: 'Inconformidad con el producto / servicio',
    complaintDescription: 'El vendedor me insultó',
    complaintStatus: 'active',
    company: { name: 'Exel Solar' },
    user: { firstName: 'Jane', lastName: 'Doe' },
  },
  {
    companyId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
    company: { name: 'SUNPOWER' },
    complaintDescription: 'El vendedor me insultó',
    complaintId: 'a2c0e7e0-4b1a-4e1a-9f1a-0e5a9a1b0e7e',
    complaintStatus: 'active',
    complaintSubject: 'Comportamiento Inapropiado',
    user: { firstName: 'John', lastName: 'Doe' },
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

  it('should return all the complaints of a company', async () => {
    const response = await ComplaintService.getComplaintsByCompany({
      start: 0,
      pageSize: 10,
      companyId: 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
    })
    expect(unwrap(response).rows)
      .excluding([...attributesToExclude, 'company'])
      .to.deep.equal(
        testComplaints.filter(
          (test) => test.companyId == 'c1b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e'
        )
      )
  })

  it('should return all the complaints of a user', async () => {
    const response = await ComplaintService.getComplaintsByUser({
      start: 0,
      pageSize: 10,
      userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b8',
    })
    expect(unwrap(response).rows)
      .excluding([...attributesToExclude, 'user'])
      .to.deep.equal(
        testComplaints.filter(
          (test) => test.userId == '8de45630-2e76-4d97-98c2-9ec0d1f3a5b8'
        )
      )
  })

  it('should return a complaint by id', async () => {
    const response = await ComplaintService.getComplaintById(testComplaints[0].complaintId)
    expect(unwrap(response))
      .excluding(attributesToExclude)
      .to.deep.equal(testComplaints[0])
  })

  it('should create a new complaint', async () => {
    const newComplaint: ComplaintService.ComplaintType = {
      complaintId: 'compl-1238-efgh-0000',
      userId: '8de45630-2e76-4d97-98c2-9ec0d1f3a5b9',
      companyId: 'a2b0e7e0-0b1a-4e1a-9f1a-0e5a9a1b0e7e',
      complaintSubject: 'Mal Servicio',
      complaintDescription: 'El vendedor me insultó',
      complaintStatus: 'active',
    }
    const response = await ComplaintService.addComplaint(newComplaint)
    expect(unwrap(response))
      .excluding(attributesToExclude)
      .to.deep.equal(newComplaint)
  })

  it('should mark a complaint as Inactive', async () => {
    const response = await ComplaintService.updateComplaintStatus(
      'compl-1234-efgh-0000',
      'inactive'
    )

    expect(response.complaintStatus).to.equal('inactive')
  })
})

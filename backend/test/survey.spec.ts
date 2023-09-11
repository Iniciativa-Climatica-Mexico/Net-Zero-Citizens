import chai from 'chai'
import chaiExclude from 'chai-exclude'
import { db, initDB } from '../src/configs/database.config'
import {
  getAllSurveys,
  getSurveyById,
  createSurvey,
  closeSurvey,
} from '../src/services/survey.service'
import { unwrap } from './utils'
import Survey from '../src/models/survey.model'

chai.use(chaiExclude)

const { expect } = chai

const testSurveyList = [
  {
    surveyId: 'surv-1234-efgh-0000',
    title: 'Encuesta de satisfacción',
    description: 'Encuesta para medir la satisfacción de los clientes',
    endDate: null,
  },
  {
    surveyId: 'surv-5678-abcd-1111',
    title: 'Product Feedback Survey',
    description: 'Survey to gather feedback on our latest product',
    endDate: null,
  },
  {
    surveyId: 'surv-9876-dcba-2222',
    title: 'Employee Engagement Survey',
    description: 'Survey to measure employee engagement in the company',
    endDate: null,
  },
  {
    surveyId: 'surv-5555-efgh-3333',
    title: 'Website Usability Survey',
    description: 'Survey to assess the usability of our website',
    endDate: null,
  },
]

const testSurvey = [
  {
    surveyId: 'surv-0309-efgh-0000',
    title: 'Encuesta de Portaluppi',
    description: 'Portaluppi nos va a invitar pastelitos',
  },
]

const attributesToExclude = ['createdAt', 'updatedAt', 'startDate']
const attributesToExclude2 = [
  'createdAt',
  'updatedAt',
  'startDate',
  'surveyId',
]

const attributesToExclude3 = [
  'createdAt',
  'updatedAt',
  'endDate',
]

const surveyToCreate = {
  title: 'Encuesta de prueba',
  description: 'Encuesta para probar el servicio de encuestas',
}

beforeEach(async () => {
  await db.drop()
  await initDB()
})

describe('Survey Service', () => {
  it('should return a list of all surveys', async () => {
    const response = await getAllSurveys({ start: 0, pageSize: 10 })
    expect(unwrap(response).rows)
      .excludingEvery(attributesToExclude)
      .to.deep.equal(testSurveyList)
  })

  it('should return a survey by id', async () => {
    const response = await getSurveyById('surv-1234-efgh-0000')
    expect(unwrap(response))
      .excludingEvery(attributesToExclude)
      .to.deep.equal(testSurveyList[0])
  })

  it('should return null if survey does not exist', async () => {
    const response = await getSurveyById('surv-1234-efgh-0001')
    expect(response).to.be.null
  })

  it('should create a new survey', async () => {
    const response = await createSurvey(surveyToCreate)
    const surveyDb = Survey.findByPk(response.surveyId)
    expect(unwrap(surveyDb))
      .excludingEvery(attributesToExclude2)
      .to.deep.equal(surveyToCreate)
  })

  it('should close a survey giving an endDate to the testSurvey', async () => {
    await closeSurvey('surv-0309-efgh-0000')
    const surveyBd = await Survey.findByPk('surv-0309-efgh-0000')
    expect(unwrap(surveyBd)?.endDate).to.not.be.null
  })
})

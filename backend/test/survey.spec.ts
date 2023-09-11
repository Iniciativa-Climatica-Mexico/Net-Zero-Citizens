import chai from 'chai'
import chaiExclude from 'chai-exclude'
import { db, initDB } from '../src/configs/database.config'
import {
  getAllSurveys,
  getSurveyById,
  createSurvey,
} from '../src/services/survey.service'
import { unwrap } from './utils'

chai.use(chaiExclude)

const { expect } = chai

const testSurveyList = [
  {
    surveyId: 'surv-1234-efgh-0000',
    title: 'Encuesta de satisfacción',
    description: 'Encuesta para medir la satisfacción de los clientes',
  },
  {
    surveyId: 'surv-5678-abcd-1111',
    title: 'Product Feedback Survey',
    description: 'Survey to gather feedback on our latest product',
  },
  {
    surveyId: 'surv-9876-dcba-2222',
    title: 'Employee Engagement Survey',
    description: 'Survey to measure employee engagement in the company',
  },
  {
    surveyId: 'surv-5555-efgh-3333',
    title: 'Website Usability Survey',
    description: 'Survey to assess the usability of our website',
  },
]

const attributesToExclude = ['createdAt', 'updatedAt', 'startDate', 'endDate']
const attributesToExclude2 = [
  'createdAt',
  'updatedAt',
  'startDate',
  'endDate',
  'surveyId',
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
    expect(unwrap(response))
      .excludingEvery(attributesToExclude2)
      .to.deep.equal(surveyToCreate)
  })
})

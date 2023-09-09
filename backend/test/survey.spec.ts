import chai from 'chai'
import chaiExclude from 'chai-exclude'
import { db, initDB } from '../src/configs/database.config'
import { getAllSurveys, getSurveyById } from '../src/services/survey.service'
import { unwrap } from './utils'
import { start } from 'repl'

chai.use(chaiExclude)

const { expect } = chai
const testData = [
  {
    title: 'Encuesta de satisfacción',
    description: 'Encuesta para medir la satisfacción de los clientes',
  },
  {
    title: 'Product Feedback Survey',
    description: 'Survey to gather feedback on our latest product',
  },
  {
    title: 'Employee Engagement Survey',
    description: 'Survey to measure employee engagement in the company',
  },
  {
    title: 'Website Usability Survey',
    description: 'Survey to assess the usability of our website',
  },
]
const attributesToExclude = [
  'surveyId',
  'createdAt',
  'updatedAt',
  'questions',
  'startDate',
  'endDate',
]

beforeEach(async () => {
  await db.drop()
  await initDB()
})

describe('Survey Service', () => {
  it('should return a list of all surveys', async () => {
    const response = await getAllSurveys({ start: 0, pageSize: 10 })
    expect(unwrap(response).rows)
      .excluding(attributesToExclude)
      .to.deep.equal(testData)
  })
})
it('should return a survey by id', async () => {
  const response = await getSurveyById('surv-1234-efgh-0000')
  expect(unwrap(response))
    .excluding(attributesToExclude)
    .to.deep.equal(testData[0])
})

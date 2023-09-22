import chai from 'chai'
import chaiExclude from 'chai-exclude'
import chaiSubset from 'chai-subset'
import chaiDeepEqualInAnyOrder from 'deep-equal-in-any-order'
import { db, initDB } from '../src/configs/database.config'
import { getSurveyReport } from '../src/services/report.service'

chai.use(chaiExclude)
chai.use(chaiSubset)
chai.use(chaiDeepEqualInAnyOrder)

const { expect } = chai
const testData = {
  surveyId: 'beaa7b8d-0531-4f24-9a0a-d08900f1f7db',
  title: 'Encuesta de satisfacción',
  description: 'Encuesta para medir la satisfacción de los clientes',
  questions: [
    {
      questionText: '¿Qué tan satisfecho está con el servicio?',
      questionType: 'scale',
      answers: [
        {
          count: 1,
          label: '5',
        },
        {
          count: 1,
          label: '4',
        },
        {
          count: 0,
          label: '3',
        },
        {
          count: 0,
          label: '2',
        },
        {
          count: 0,
          label: '1',
        },
      ],
    },
    {
      questionText: '¿Cómo describiría nuestro servicio?',
      questionType: 'multiple_choice',
      answers: [
        {
          count: 1,
          label: 'Excelente',
        },
        {
          count: 1,
          label: 'Bueno',
        },
        {
          count: 0,
          label: 'Regular',
        },
        {
          count: 0,
          label: 'Malo',
        },
        {
          count: 0,
          label: 'Pésimo',
        },
      ],
    },
  ],
}

const attributesToExclude = ['createdAt', 'updatedAt', 'startDate', 'endDate']

beforeEach(async () => {
  await db.drop()
  await initDB()
})

describe('Report Service', () => {
  it('should return a report of a survey with its questions, options and answers', async () => {
    const survey = await getSurveyReport('beaa7b8d-0531-4f24-9a0a-d08900f1f7db')
    expect(survey)
      .excludingEvery(attributesToExclude)
      .to.deep.equalInAnyOrder(testData)
  })

  it('It should return a null survey', async () => {
    const survey = await getSurveyReport('testID')
    expect(survey).to.be.null
  })
})

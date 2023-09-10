import chai from 'chai'
import chaiExclude from 'chai-exclude'
import chaiSubset from 'chai-subset'
import { db, initDB } from '../src/configs/database.config'
import { getSurveyReport } from '../src/services/report.service'

chai.use(chaiExclude)
chai.use(chaiSubset)

const { expect } = chai
const testData = {
  surveyId: 'surv-1234-efgh-0000',
  title: 'Encuesta de satisfacción',
  description: 'Encuesta para medir la satisfacción de los clientes',
  endDate: null,
  questions: [
    {
      questionText: '¿Qué tan satisfecho está con el servicio?',
      questionType: 'scale',
      questionOptions: [],
      answers: [
        {
          answerText: null,
          scaleValue: 5,
        },
        {
          answerText: null,
          scaleValue: 4,
        },
      ],
    },
    {
      questionText: '¿Cómo describiría nuestro servicio?',
      questionType: 'multiple_choice',
      questionOptions: [
        {
          textOption: 'Excelente',
        },
        {
          textOption: 'Bueno',
        },
        {
          textOption: 'Regular',
        },
        {
          textOption: 'Malo',
        },
        {
          textOption: 'Pésimo',
        },
      ],
      answers: [
        {
          answerText: 'Excelente',
          scaleValue: null,
        },
        {
          answerText: 'Bueno',
          scaleValue: null,
        },
      ],
    },
  ],
}

const attributesToExclude = ['createdAt', 'updatedAt', 'startDate']

beforeEach(async () => {
  await db.drop()
  await initDB()
})

describe('Report Service', () => {
  it('should return a report of a survey with its questions, options and answers', async () => {
    const survey = await getSurveyReport('surv-1234-efgh-0000')
    expect(survey).excludingEvery(attributesToExclude).to.deep.equal(testData)
  })

  it('It should return a null survey', async () => {
    const survey = await getSurveyReport('testID')
    expect(survey).to.be.null
  })
})
